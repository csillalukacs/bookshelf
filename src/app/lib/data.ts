import { Author } from './definitions';
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