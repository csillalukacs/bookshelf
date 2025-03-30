'use server'

import { Author, Book, Edition, Publisher } from "./lib/definitions";
import { revalidatePath } from "next/cache";
import { getAuthorByName, getPublisherByName } from "./lib/data";
import { pool } from "./postgres";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";


export type AuthorSubmitState = 
{
  author?: Author;
  status: string;
};

export type BookSubmitState =
{
  book?: Book;
  status: string;
};

export type EditionSubmitState =
{
  edition?: Edition;
  status: string;
}

export type PublisherSubmitState =
{
  publisher?: Publisher;
  status: string;
}

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(prevState: any, formData: FormData) 
{
  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided." };

  const buffer = await file.arrayBuffer();
  const fileKey = `${randomUUID()}-${file.name}`;

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

    await updateCoverImg(fileKey, formData.get('editionId') as string);

    // Return CloudFront URL instead of S3 URL
    const imageUrl = `${process.env.CLOUDFRONT_URL}${fileKey}`;

    // Optionally revalidate paths if needed
    revalidatePath("/");

    return { success: true, imageUrl };
  } 
  catch (error) 
  {
    console.error("Upload error:", error);
    return { error: "Upload failed." };
  }
}

export async function updateCoverImg(newCoverImg: string, editionId: string) 
{
  try 
  {
    console.log(`Updating cover image for edition with id ${editionId}...`);
    const result = await pool.query(
      'UPDATE edition SET cover_img = $1 WHERE id = $2 RETURNING *', 
      [newCoverImg, editionId]
    );
    return {status: 'success'};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return {status: 'error'};
  }
}

export async function addAuthor(prevState: AuthorSubmitState, formData: FormData): Promise<AuthorSubmitState> 
{
  const name = formData.get('name');

  if (!name) return {status: 'error'};
  if (name=="test") return  {status: 'error'};
  const nameStr = name.toString();
  nameStr.trim();
  if (nameStr.length === 0) return  {status: 'error'};

  return insertAuthorIntoDb(nameStr);
}

async function insertAuthorIntoDb(nameStr: string) : Promise<AuthorSubmitState>
{
  try 
  {
    console.log('Adding new author...');
    const result = await pool.query('INSERT INTO author (name) VALUES ($1) RETURNING *', [nameStr]);
    const state = {author: {...result.rows[0]}, status: 'success'}
    return state;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
}

async function insertPublisherIntoDb(nameStr: string) : Promise<PublisherSubmitState>
{
  try 
  {
    console.log('Adding new publisher...');
    const result = await pool.query('INSERT INTO publisher (name) VALUES ($1) RETURNING *', [nameStr]);
    const state = {publisher: {...result.rows[0]}, status: 'success'}
    return state;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
}

export async function addBook(prevState: BookSubmitState, formData: FormData): Promise<BookSubmitState>
{
  const title = formData.get('title');
  const author = formData.get('author');
  const year = formData.get('year');
  const language = formData.get('language');

  if (!title || !author || !year || !language) return {status: 'error'};

  const titleStr = title.toString();
  titleStr.trim();
  if (titleStr.length === 0) return  {status: 'error'};

  const authorStr = author.toString();
  authorStr.trim();
  if (authorStr.length === 0) return  {status: 'error'};
  let authorId = (await getAuthorByName(authorStr))?.id;

  if (!authorId) 
  {
    authorId = (await insertAuthorIntoDb(authorStr))?.author?.id;
  }

  const langId = language.toString();
  const yearStr = year.toString();

  try 
  {
    console.log('Adding new book...');
    const result = await pool.query(
      'INSERT INTO book (title, author_id, first_pub, orig_lang_id) VALUES ($1, $2, $3, $4) RETURNING *', 
      [titleStr, authorId, yearStr, langId]
    );
    const state = {book: {...result.rows[0]}, status: 'success'}
    return state;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
}

export async function addEdition(prevState: BookSubmitState, formData: FormData): Promise<EditionSubmitState>
{
  const title = formData.get('title');
  const year = formData.get('year');
  const language = formData.get('language');
  const bookId = formData.get('bookId');
  const isbn = formData.get('isbn');
  const publisher = formData.get('publisher');
  const translator = formData.get('translator');


  if (!title || !year || !language || !isbn || !publisher) return {status: 'error'};

  const titleStr = title.toString();
  titleStr.trim();
  if (titleStr.length === 0) return  {status: 'error'};

  const langId = language.toString();
  const yearStr = year.toString();

  const publisherStr = publisher.toString();
  publisherStr.trim();
  if (publisherStr.length === 0) return  {status: 'error'};

  let publisherId = (await getPublisherByName(publisherStr))?.id;

  if (!publisherId)
  {
    publisherId = (await insertPublisherIntoDb(publisherStr))?.publisher?.id;
  }

  try 
  {
    console.log('Adding new book...');
    const result = await pool.query(
      'INSERT INTO edition ' +
      '(ed_title, year_pub, lang_id, publisher_id, book_id, isbn) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [titleStr, yearStr, langId, publisherId, bookId, isbn]
    );
    const state = {edition: {...result.rows[0]}, status: 'success'}
    return state;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
}

export async function deleteAuthor(id: string)
{
  try 
  {
    console.log(`Deleting author with id ${id}...`);
    const result = await pool.query('DELETE FROM author WHERE id = $1', [id]);
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
  revalidatePath('/author/list')
}