'use server'

import { Author, Book, Edition, List, Publisher } from "./lib/definitions";
import { revalidatePath } from "next/cache";
import { fetchListById, getAuthorByName, getPublisherByName } from "./lib/data";
import { pool } from "./postgres";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { auth, signOut } from "./auth";
import { redirect, RedirectType } from "next/navigation";

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

export async function uploadImage(prevState: any, formData: FormData) 
{
  const session = await auth();
  if (!session?.user) return { error: "You must be logged in to perform this action." };
  
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

export async function addAuthor(prevState: Result<Author>, formData: FormData): Promise<Result<Author>> 
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const name = formData.get('name');

  if (!name) return {success: false, error: 'Name is required'};
  let nameStr = name.toString();
  nameStr = nameStr.trim();
  if (nameStr.length === 0) return  {success: false, error: 'Name is required'};

  return insertAuthorIntoDb(nameStr);
}

export async function addList(prevState: Result<List>, formData: FormData): Promise<Result<List>> 
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const name = formData.get('name');
  const user_id = formData.get('userId')?.toString();
 
  if (!user_id) return {success: false, error: 'User ID was null (maybe you are not logged in)'}
  if (!name) return  {success: false, error: 'Name is required'};
  const nameStr = name.toString();
  nameStr.trim();
  if (nameStr.length === 0) return  {success: false, error: 'Name is required'};;

  return insertListIntoDb(nameStr, user_id);
}

async function insertAuthorIntoDb(nameStr: string) : Promise<Result<Author>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  try 
  {
    console.log('Adding new author...');
    const result = await pool.query<Author>('INSERT INTO author (name) VALUES ($1) RETURNING *', [nameStr]);
    revalidatePath('/author/list')
    return {success: true, value: result.rows[0]};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

async function insertListIntoDb(nameStr: string, user_id: string) : Promise<Result<List>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  try 
  {
    console.log('Adding new list...');
    const result = await pool.query('INSERT INTO list (name, created, user_id) VALUES ($1, $2, $3) RETURNING *', 
      [nameStr, new Date(), user_id]);
    return {success: true as const, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
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

export async function addBook(prevState: Result<Book>, formData: FormData): Promise<Result<Book>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const title = formData.get('title');
  const author = formData.get('author');
  const year = formData.get('year');
  const language = formData.get('language');

  if (!title || !author || !year || !language) return {success: false, error: 'One or more fields are missing'};

  const titleStr = title.toString();
  titleStr.trim();
  if (titleStr.length === 0) return  {success: false, error: 'Title is required'};

  const authorStr = author.toString();
  authorStr.trim();
  if (authorStr.length === 0) return  {success: false, error: 'Author is required'};
  let authorId = (await getAuthorByName(authorStr))?.id;

  if (!authorId) 
  {
    console.log('Author not found, inserting...');

    const result = await insertAuthorIntoDb(authorStr);
    if (!result.success) return result;
    authorId = result.value.id;
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


  if (!title || !year || !language || !isbn || !publisher) return {success: false, error: 'One or more fields are missing'};

  const titleStr = title.toString();
  titleStr.trim();
  if (titleStr.length === 0) return  {success: false, error: 'Title is required'};

  const langId = language.toString();
  const yearStr = year.toString();

  const publisherStr = publisher.toString();
  publisherStr.trim();
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
      '(ed_title, year_pub, lang_id, publisher_id, book_id, isbn) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [titleStr, yearStr, langId, publisherId, bookId, isbn]
    );
    return {success: true, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function addEditionToList(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };
  const listId = formData.get('list');
  if (!listId) return {success: false, error: "List ID was not provided." };
  const list = await fetchListById(listId.toString());
  if (!list) return {success: false, error: "List not found." };
  if (list.user_id !== session.user.id) 
    return {success: false, error: "You are not authorized to add editions to this list." };

  try {
    const listId = formData.get('list');
    const editionId = formData.get('editionId');
    console.log(`Adding edition ${editionId} to list ${listId}...`);
    const result = await pool.query(
      'INSERT INTO list_edition (list_id, edition_id) VALUES ($1, $2) RETURNING *', 
      [listId, editionId]
    );
    return {success: true};
  }
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function deleteAuthor(id: string)
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  try 
  {
    console.log(`Deleting author with id ${id}...`);
    const result = await pool.query('DELETE FROM author WHERE id = $1', [id]);
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {error: 'Unknown database error'};
  }
  revalidatePath('/author/list')
}

export async function deleteBook(id: string)
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };
  
  try 
  {
    console.log(`Deleting book with id ${id}...`);
    const result = await pool.query('DELETE FROM book WHERE id = $1', [id]);
    redirect('/book/list', RedirectType.push)
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {error: 'Unknown database error'};
  }
}