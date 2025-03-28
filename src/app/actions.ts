'use server'

import { Author, Book } from "./lib/definitions";
import { revalidatePath } from "next/cache";
import { getAuthorByName } from "./lib/data";
import sql from "./postgres";


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

export async function addAuthor(prevState: AuthorSubmitState, formData: FormData): Promise<AuthorSubmitState> 
{
  const name = formData.get('name');

  if (!name) return {status: 'error'};
  if (name=="test") return  {status: 'error'};
  const nameStr = name.toString();
  nameStr.trim();
  if (nameStr.length === 0) return  {status: 'error'};

  try 
  {
    console.log('Adding new author...');
    const result = await sql<Author[]>`INSERT INTO author (name) 
    VALUES (${nameStr}) RETURNING *`;
    const state = {author: {...result[0]}, status: 'success'}
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
    try 
    {
      console.log('Adding new author...');
      const result = await sql<Author[]>`INSERT INTO author (name) 
      VALUES (${authorStr}) RETURNING *`;
      authorId = result[0].id;
    } 
    catch (error) 
    {
      console.error('Database Error:', error);
      return  {status: 'error'};
    }  
  }

  const langId = language.toString();
  const yearStr = year.toString();

  try 
  {
    console.log('Adding new book...');
    const result = await sql<Book[]>`INSERT INTO book 
      (title, author_id, first_pub, orig_lang_id) 
      VALUES (${titleStr}, ${authorId}, ${yearStr}, ${langId} ) RETURNING *`;
    const state = {book: {...result[0]}, status: 'success'}
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
  console.log(id);
  try 
  {
    console.log(`Deleting author with id ${id}...`);
    const result = await sql`DELETE FROM author WHERE id = ${id}`;
    console.log(result);
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {status: 'error'};
  }
  revalidatePath('/author/list')
}