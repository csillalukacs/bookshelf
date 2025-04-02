'use server'

import { revalidatePath } from "next/cache";
import { Author } from "../lib/definitions";
import { Result } from "./actions";
import { auth } from "../auth";
import { pool } from "../postgres";


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

export async function insertAuthorIntoDb(nameStr: string) : Promise<Result<Author>>
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