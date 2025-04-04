'use server'

import { Edition, Publisher } from "../lib/definitions";
import { getPublisherByName } from "../lib/data";
import { pool } from "../postgres";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { auth, signOut } from "../auth";
import { revalidatePath } from "next/cache";

export type Result<T> = {success: true, value: T} | {success: false, error: string};
export type SimpleResult = {success: true} | {success: false, error: string};

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function logOut ()  
  {
    await signOut(
      { 
        redirectTo: "/home" 
      }
    )
  }

export async function uploadImage(prevState: any, formData: FormData): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return { success: false, error: "You must be logged in to perform this action." };
  
  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided." };

  const editionId = formData.get('editionId');
  if (!editionId) return { success: false, error: "No edition ID provided." };

  const bookId = formData.get('bookId');
  if (!bookId) return { success: false, error: "No book ID provided." };
  
  const type: "cover" | "spine" = formData.get('type') as "cover" | "spine";
  if (!type) return { success: false, error: "No type provided." };

  const buffer = await file.arrayBuffer();
  const fileExt = file.name.split('.').pop();

  const fileKey = `${type}-${editionId}.${fileExt}`;

  try  
  {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      })
    );


    if (type === "cover") 
    {
      await updateCoverImg(fileKey, editionId.toString());
    }
    else if (type === "spine") 
    {
      await updateSpineImg(fileKey, editionId.toString());
    }

    revalidatePath(`/book/${bookId}/edition/${editionId}`);
    return { success: true };
  } 
  catch (error) 
  {
    console.error("Upload error:", error);
    return { success: false, error: "Upload failed." };
  }
}

export async function updateCoverImg(newCoverImg: string, editionId: string) 
{
  const session = await auth();
  if (!session?.user) return { error: "You must be logged in to perform this action." };
  try 
  {
    console.log(`Updating cover image for edition with id ${editionId}...`);
    const result = await pool.query(
      'UPDATE edition SET cover_img = $1 WHERE id = $2 RETURNING *', 
      [newCoverImg, editionId]
    );
    return {error: 'success'};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return {error: 'error'};
  }
}

export async function updateSpineImg(newSpineImg: string, editionId: string): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };
  try 
  {
    console.log(`Updating spine image for edition with id ${editionId}...`);
    const result = await pool.query(
      'UPDATE edition SET spine_img = $1 WHERE id = $2 RETURNING *', 
      [newSpineImg, editionId]
    );
    return {success: true};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return {success: false, error: 'Unknown database error'};
  }
}

async function insertPublisherIntoDb(nameStr: string) : Promise<Result<Publisher>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  try 
  {
    console.log('Adding new publisher...');
    const result = await pool.query('INSERT INTO publisher (name) VALUES ($1) RETURNING *', [nameStr]);
    return {success: true, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function addEdition(prevState: Result<Edition>, formData: FormData): Promise<Result<Edition>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const title = formData.get('title');
  const year = formData.get('year');
  const language = formData.get('language');
  const bookId = formData.get('bookId');
  const isbn = formData.get('isbn');
  const publisher = formData.get('publisher');
  const translator = formData.get('translator');
  const pages = formData.get('pages');
  const height = formData.get('height');
  const width = formData.get('width');
  const thickness = formData.get('thickness');


  if (!title || !year || !language || !isbn || !publisher || !pages || !height || !width || !thickness)
  {
    return {success: false, error: 'One or more fields are missing!'};
  } 

  const pagesNum = parseInt(pages.toString());
  const heightNum = parseInt(height.toString());
  const widthNum = parseInt(width.toString());
  const thicknessNum = parseInt(thickness.toString());

  if (pagesNum <= 0) return {success: false, error: 'Pages must be greater than 0'};
  if (heightNum <= 0) return {success: false, error: 'Height must be greater than 0'};
  if (widthNum <= 0) return {success: false, error: 'Width must be greater than 0'};
  if (thicknessNum <= 0) return {success: false, error: 'Thickness must be greater than 0'};

  let titleStr = title.toString();
  titleStr = titleStr.trim();
  if (titleStr.length === 0) return  {success: false, error: 'Title is required'};

  const langId = language.toString();
  const yearStr = year.toString();

  let publisherStr = publisher.toString();
  publisherStr =publisherStr.trim();
  if (publisherStr.length === 0) return  {success: false, error: 'Publisher is required'};

  let publisherId = (await getPublisherByName(publisherStr))?.id;

  if (!publisherId)
  {
    const result = await insertPublisherIntoDb(publisherStr);
    if (!result.success) return result;
    publisherId = result.value.id;
  }

  try 
  {
    console.log('Adding new book...');
    const result = await pool.query(
      'INSERT INTO edition ' +
      '(ed_title, year_pub, lang_id, publisher_id, book_id, isbn, height, width, pages, thickness) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
      [titleStr, yearStr, langId, publisherId, bookId, isbn, height, width, pages, thickness]
    );
    revalidatePath('/book/${bookId}');
    return {success: true, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}
