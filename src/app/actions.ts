'use server'

import { Author, Book, Edition } from "./lib/definitions";
import { revalidatePath } from "next/cache";
import { getAuthorByName } from "./lib/data";
import { pool } from "./postgres";


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
      const result = await pool.query(
        'INSERT INTO author (name) VALUES ($1) RETURNING *', [authorStr]
      );
      authorId = result.rows[0].id;
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


  if (!title || !year || !language || !isbn) return {status: 'error'};

  const titleStr = title.toString();
  titleStr.trim();
  if (titleStr.length === 0) return  {status: 'error'};

  const langId = language.toString();
  const yearStr = year.toString();

  try 
  {
    console.log('Adding new book...');
    const result = await pool.query(
      'INSERT INTO edition ' +
      '(ed_title, year_pub, lang_id, publisher_id, book_id, isbn) ' +
      'VALUES ($1, $2, $3, 1, $4, $5) RETURNING *', 
      [titleStr, yearStr, langId, bookId, isbn]
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