'use server'

import { redirect, RedirectType } from "next/navigation";
import { auth } from "../auth";
import { getAuthorByName } from "../lib/data";
import { Book } from "../lib/definitions";
import { pool } from "../postgres";
import { Result } from "./actions";
import { insertAuthorIntoDb } from "./author-actions";
import { revalidatePath } from "next/cache";

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
    revalidatePath('/book/list');
    return {success: true, value: {...result.rows[0]}};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
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