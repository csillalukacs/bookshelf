'use server'

import { auth } from "../auth";
import { fetchEditionsByListId, fetchListById } from "../lib/data";
import { Result, SimpleResult } from "./actions";
import { pool } from "../postgres";
import { List } from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";


export async function addList(prevState: Result<List>, formData: FormData): Promise<Result<List>> 
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const name = formData.get('name');
  const user_id = formData.get('userId')?.toString();
 
  if (!user_id) return {success: false, error: 'User ID was null (maybe you are not logged in)'}
  if (!name) return  {success: false, error: 'Name is required'};
  const nameStr = name.toString();
  nameStr.trim();
  if (nameStr.length === 0) return  {success: false, error: 'Name is required'};;

  return insertListIntoDb(nameStr, user_id);
}

async function insertListIntoDb(nameStr: string, user_id: string) : Promise<Result<List>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  try 
  {
    console.log('Adding new list...');
    const result = await pool.query('INSERT INTO list (name, created, user_id) VALUES ($1, $2, $3) RETURNING *', 
      [nameStr, new Date(), user_id]);
    
    revalidatePath(('/profile/lists'));
    return {success: true as const, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function addEditionToList(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };
  const listId = formData.get('list');
  if (!listId) return {success: false, error: "List ID was not provided." };
  const list = await fetchListById(listId.toString());
  if (!list) return {success: false, error: "List not found." };
  if (list.user_id !== session.user.id) 
    return {success: false, error: "You are not authorized to perform this action." };

  const edtions = await fetchEditionsByListId(listId.toString());
  const editionId = formData.get('editionId');
  if (edtions.some(e => e.id === editionId)) return {success: false, error: "Already in list." };

  try {
    console.log(`Adding edition ${editionId} to list ${listId}...`);
    await pool.query(
      'INSERT INTO list_edition (list_id, edition_id) VALUES ($1, $2) RETURNING *', 
      [listId, editionId]
    );
    revalidatePath(('/profile/lists'));
    return {success: true};
  }
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function removeEditionFromList(editionId: string, listId: string) : Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const list = await fetchListById(listId.toString());
  if (!list) return {success: false, error: "List not found." };
  
  if (list.user_id !== session.user.id) 
    return {success: false, error: "You are not authorized to perform this action." };

  try {
    console.log(`Removing edition ${editionId} from list ${listId}...`);
    await pool.query(
      'DELETE FROM list_edition WHERE list_id = $1 AND edition_id = $2',
      [listId, editionId]
    );
    revalidatePath(('/profile/lists'));
    return {success: true};
  }
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function deleteList(id: string)
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const list = await fetchListById(id.toString());
  if (!list) return {success: false, error: "List not found." };
  
  if (list.user_id !== session.user.id) 
    return {success: false, error: "You are not authorized to perform this action." };

  try {
    console.log(`Deleting list with id ${id}...`);
    await pool.query('DELETE FROM list WHERE id = $1', [id]);
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {error: 'Unknown database error'};
  }
  redirect('/profile/lists', RedirectType.push);
}
