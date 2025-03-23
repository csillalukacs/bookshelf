'use server'

import postgres from "postgres";
import { Author } from "./lib/definitions";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type AuthorSubmitState = 
{
  author?: Author;
  status: string;
};

export async function addAuthor(prevState: AuthorSubmitState, formData: FormData): Promise<AuthorSubmitState> 
{
  const name = formData.get('name');
  console.log(formData);
  console.log(name);

  if (!name) return {status: 'error'};
  if (name=="test") return  {status: 'error'};
  const nameStr = name.toString();

  try 
  {
    console.log('Adding new author...');
    const result = await sql<Author[]>`INSERT INTO author (name) VALUES (${nameStr}) RETURNING *`;
    console.log(result);
    const state = {author: {...result[0]}, status: 'success'}
    console.log(state);
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