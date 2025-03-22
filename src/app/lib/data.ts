import postgres from 'postgres';
import { Author } from './definitions';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
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