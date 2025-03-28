import { Author, Book, Language } from './definitions';
import sql from '../postgres';
 
 
export async function fetchAuthors() 
{
  try 
  {
    console.log('Fetching authors...');
    const data = await sql<Author[]>`SELECT * FROM author`;
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch authors.');
  }
}

export async function fetchBooks()
{
  try 
  {
    console.log('Fetching books...');
    const data = await sql<Book[]>`SELECT * FROM book`;
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books.');
  }
}

export async function fetchLanguages() 
{
  try 
  {
    console.log('Fetching languages...');
    const data = await sql<Author[]>`SELECT * FROM language`;
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch authors.');
  }
}

export async function fetchAuthorById(id: string) {
  try 
  {
    console.log(`Fetching author with id ${id}...`);
    const data = await sql<Author[]>`SELECT * FROM author WHERE id = ${id}`;
    console.log(data);
    return data[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch author with id ${id}`);
  }
}


export async function fetchBookById(id: string) 
{
  try 
  {
    console.log(`Fetching book with id ${id}...`);
    const data = await sql<Book[]>`SELECT * FROM book WHERE id = ${id}`;
    console.log(data);
    return data[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch book with id ${id}`);
  }
}

export async function fetchLanguageById(id: string)
{
  try 
  {
    console.log(`Fetching language with id ${id}...`);
    const data = await sql<Language[]>`SELECT * FROM language WHERE id = ${id}`;
    console.log(data);
    return data[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch language with id ${id}`);
  }
}


export async function getAuthorByName(name: string) {
  try 
  {
    console.log(`Fetching author with name ${name}...`);
    const data = await sql<Author[]>`SELECT * FROM author WHERE name = ${name}`;
    console.log(data);
    if (data.length === 0) return null;
    return data[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch author with name ${name}`);
  }
}

export async function fetchBooksByAuthorId(id: string) 
{
  try 
  {
    console.log(`Fetching books by author with id ${id}...`);
    const data = await sql<Book[]>`SELECT * FROM book WHERE author_id = ${id}`;
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch books by author with id ${id}`);
  }
}