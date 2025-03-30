import { Author, Book, Edition, Language } from './definitions';
import { pool } from '../postgres';
 
 
export async function fetchAuthors(): Promise<Author[]>
{
  try 
  {
    console.log('Fetching authors...');
    const data = await pool.query('SELECT * FROM author');
    console.log(data.rows);
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch authors.');
  }
}

export async function fetchBooks(): Promise<Book[]>
{
  try 
  {
    console.log('Fetching books...');
    const data = await pool.query('SELECT * FROM book');
    console.log(data.rows);
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books.');
  }
}

export async function getOneEdition(bookId: string): Promise<Edition>
{
  // todo: get the first result with a cover
  try 
  {
    console.log(`Fetching one edition for book with id ${bookId}...`);
    const data = await pool.query('SELECT * FROM edition WHERE book_id = $1', [bookId]);
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch edition for book with id ${bookId}`);
  }
}

export async function fetchLanguages(): Promise<Language[]>
{
  try 
  {
    console.log('Fetching languages...');
    const data = await pool.query('SELECT * FROM language');
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch authors.');
  }
}

export async function fetchAuthorById(id: string): Promise<Author>
{
  try 
  {
    console.log(`Fetching author with id ${id}...`);
    const data = await pool.query('SELECT * FROM author WHERE id = $1', [id]);
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch author with id ${id}`);
  }
}


export async function fetchBookById(id: string): Promise<Book>
{
  try 
  {
    console.log(`Fetching book with id ${id}...`);
    const data = await pool.query('SELECT * FROM book WHERE id = $1', [id]);
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch book with id ${id}`);
  }
}

export async function fetchLanguageById(id: string): Promise<Language>
{
  try 
  {
    console.log(`Fetching language with id ${id}...`);
    const data = await pool.query('SELECT * FROM language WHERE id = $1', [id]);
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch language with id ${id}`);
  }
}


export async function getAuthorByName(name: string): Promise<Author | null>
{
  try 
  {
    console.log(`Fetching author with name ${name}...`);
    const data = await pool.query('SELECT * FROM author WHERE name = $1', [name]);
    if (data.rows.length === 0) return null;
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch author with name ${name}`);
  }
}

export async function fetchBooksByAuthorId(id: string): Promise<Book[]>
{
  try 
  {
    console.log(`Fetching books by author with id ${id}...`);
    const data = await pool.query('SELECT * FROM book WHERE author_id = $1', [id]);
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch books by author with id ${id}`);
  }
}

export async function fetchBookEditionsByBookId(id: string): Promise<Edition[]>
{
  try
  {
    console.log(`Fetching editions by book with id ${id}...`);
    const data = await pool.query('SELECT * FROM edition WHERE book_id = $1', [id]);
    return data.rows;
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch editions by book with id ${id}`);
  }
}

export async function fetchEditionById(id: string): Promise<Edition>
{
  try
  {
    console.log(`Fetching edition with id ${id}...`);
    const data = await pool.query('SELECT * FROM edition WHERE id = $1', [id]);
    console.log(data.rows);
    return data.rows[0];
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch edition with id ${id}`);
  }
}

export async function getCoverUrl(edition: Edition): Promise<string>
{
  if (edition.cover_img) return process.env.CLOUDFRONT_URL + edition.cover_img;
  else return `https://covers.openlibrary.org/b/isbn/${edition.isbn}-M.jpg`;
}