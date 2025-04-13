'use server'

import { Publisher } from "../lib/definitions";
import { pool } from "../postgres";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { auth, signOut } from "../auth";
import { revalidatePath } from "next/cache";
import { updateCoverImg, updateSpineImg } from "./edition-actions";

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

export async function uploadImage(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
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

    revalidatePath(`/edition/${editionId}`);
    return { success: true };
  } 
  catch (error) 
  {
    console.error("Upload error:", error);
    return { success: false, error: "Upload failed." };
  }
}

export async function insertPublisherIntoDb(nameStr: string) : Promise<Result<Publisher>>
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


