import postgres from 'postgres';
import { Author } from './definitions';
 

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
// above doesn't work on mac, todo figure out why
// neither does const sql = postgres(process.env.POSTGRES_URL!, { ssl: { rejectUnauthorized: false } });
// we are rambling to ourselves in comments now

// btw the ! means this is not null or undefined, a "non-null assertion operator"
// in case the type checker doesn't know that. but i do 😈
const sql = postgres(process.env.POSTGRES_URL!);
 
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