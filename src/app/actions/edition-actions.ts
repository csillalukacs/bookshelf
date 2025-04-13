'use server'

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { SimpleResult } from "./actions";
import { getPublisherByName } from "../lib/data";
import { pool } from "../postgres";
import { Result } from "./actions";
import { insertPublisherIntoDb } from "./actions";
import { Edition } from "../lib/definitions";
import { redirect, RedirectType } from "next/navigation";

export async function addEdition(prevState: Result<Edition>, formData: FormData): Promise<Result<Edition>>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const title = formData.get('title');
  const year = formData.get('year');
  const language = formData.get('language');
  const bookId = formData.get('bookId');
  const isbn = formData.get('isbn');
  const publisher = formData.get('publisher');
  const pages = formData.get('pages');
  const height = formData.get('height');
  const width = formData.get('width');
  const thickness = formData.get('thickness');


  if (!title || !year || !language || !isbn || !publisher || !pages || !height || !width || !thickness)
  {
    return {success: false, error: 'One or more fields are missing!'};
  } 

  const pagesNum = parseInt(pages.toString());
  const heightNum = parseInt(height.toString());
  const widthNum = parseInt(width.toString());
  const thicknessNum = parseInt(thickness.toString());

  if (pagesNum <= 0) return {success: false, error: 'Pages must be greater than 0'};
  if (heightNum <= 0) return {success: false, error: 'Height must be greater than 0'};
  if (widthNum <= 0) return {success: false, error: 'Width must be greater than 0'};
  if (thicknessNum <= 0) return {success: false, error: 'Thickness must be greater than 0'};

  let titleStr = title.toString();
  titleStr = titleStr.trim();
  if (titleStr.length === 0) return  {success: false, error: 'Title is required'};

  const langId = language.toString();
  const yearStr = year.toString();

  let publisherStr = publisher.toString();
  publisherStr =publisherStr.trim();
  if (publisherStr.length === 0) return  {success: false, error: 'Publisher is required'};

  let publisherId = (await getPublisherByName(publisherStr))?.id;

  if (!publisherId)
  {
    const result = await insertPublisherIntoDb(publisherStr);
    if (!result.success) return result;
    publisherId = result.value.id;
  }

  try 
  {
    console.log('Adding new book...');
    const result = await pool.query(
      'INSERT INTO edition ' +
      '(ed_title, year_pub, lang_id, publisher_id, book_id, isbn, height, width, pages, thickness) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
      [titleStr, yearStr, langId, publisherId, bookId, isbn, height, width, pages, thickness]
    );
    revalidatePath('/book/${bookId}');
    return {success: true, value: {...result.rows[0]}}
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  }
}

export async function updatePublisher(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const editionId = formData.get('editionId');
  if (!editionId) return {success: false, error: "Edition ID was not provided." };

  const publisher = formData.get('name');
  if (!publisher) return {success: false, error: 'Name is required'};
  let publisherStr = publisher.toString();
  publisherStr = publisherStr.trim();
  if (publisherStr.length === 0) return  {success: false, error: 'Name is required'};;

  let publisherId = (await getPublisherByName(publisherStr))?.id;

  if (!publisherId)
  {
    const result = await insertPublisherIntoDb(publisherStr);
    if (!result.success) return result;
    publisherId = result.value.id;    
  }

  try 
  {
    console.log(`Updating publisher for edition with id ${formData.get('editionId')}...`);
    await pool.query(
      'UPDATE edition SET publisher_id = $1 WHERE id = $2 RETURNING *', 
      [publisherId, editionId]
    );
    revalidatePath(`/edition/${editionId}`);
    return {success: true};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  } 
}

export async function updateCoverImg(newCoverImg: string, editionId: string) 
{
  const session = await auth();
  if (!session?.user) return { error: "You must be logged in to perform this action." };
  try 
  {
    console.log(`Updating cover image for edition with id ${editionId}...`);
    await pool.query(
      'UPDATE edition SET cover_img = $1 WHERE id = $2 RETURNING *', 
      [newCoverImg, editionId]
    );
    return {error: 'success'};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return {error: 'error'};
  }
}

export async function updateSpineImg(newSpineImg: string, editionId: string): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };
  try 
  {
    console.log(`Updating spine image for edition with id ${editionId}...`);
    await pool.query(
      'UPDATE edition SET spine_img = $1 WHERE id = $2 RETURNING *', 
      [newSpineImg, editionId]
    );
    return {success: true};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return {success: false, error: 'Unknown database error'};
  }
}

export async function updateDimensions(prevState: SimpleResult, formData: FormData): Promise<SimpleResult>
{
  const session = await auth();
  if (!session?.user) return {success: false, error: "You must be logged in to perform this action." };

  const editionId = formData.get('editionId');
  if (!editionId) return {success: false, error: "Edition ID was not provided." };

  const height = formData.get('height');
  const width = formData.get('width');
  const thickness = formData.get('thickness');

  if (!height || !width || !thickness) return {success: false, error: 'One or more fields are missing!'};

  const heightNum = parseInt(height.toString());
  const widthNum = parseInt(width.toString());
  const thicknessNum = parseInt(thickness.toString());

  if (heightNum <= 0) return {success: false, error: 'Height must be greater than 0'};
  if (widthNum <= 0) return {success: false, error: 'Width must be greater than 0'};
  if (thicknessNum <= 0) return {success: false, error: 'Thickness must be greater than 0'};

  try 
  {
    console.log(`Updating dimensions for edition with id ${formData.get('editionId')}...`);
    await pool.query(
      'UPDATE edition SET height = $1, width = $2, thickness = $3 WHERE id = $4 RETURNING *', 
      [heightNum, widthNum, thicknessNum, editionId]
    );

    revalidatePath(`/edition/${editionId}`);
    return {success: true};
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    return  {success: false, error: 'Unknown database error'};
  } 
}

export async function fetchEditionsByPublisherId(id: string): Promise<Edition[]>
{
  try
  {
    console.log(`Fetching editions by publisher with id ${id}...`);
    const data = await pool.query(
      'SELECT * FROM edition WHERE publisher_id = $1;',
      [id]);
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch editions by publisher with id ${id}`);
  }
}

export async function deleteEdition(id: string, bookId: string)
{
  try
  {
    console.log(`Deleting edition with id ${id}...`);
    await pool.query('DELETE FROM edition WHERE id = $1', [id]);
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete edition with id ${id}`);
  }
  redirect(`/book/${bookId}`, RedirectType.push)
}