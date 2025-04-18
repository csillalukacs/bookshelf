import { Author, Book, Edition, Language, List, Publisher, User } from './definitions';
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

export async function fetchPublishers(): Promise<Publisher[]>
{
  try 
  {
    console.log('Fetching publishers...');
    const data = await pool.query('SELECT * FROM publisher');
    return data.rows;
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch publishers.');
  }
}

export async function fetchListsByUserId(id: string)
{
  try
  {
    console.log(`Fetching lists by user with id ${id}...`);
    const data = await pool.query('SELECT * FROM list WHERE user_id = $1', [id]);
    return data.rows; 
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch lists by user with id ${id}`);
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

export async function fetchPublisherById(id: string): Promise<Publisher>
{
  try 
  {
    console.log(`Fetching publisher with id ${id}...`);
    const data = await pool.query('SELECT * FROM publisher WHERE id = $1', [id]);
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch publisher with id ${id}`);
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

export async function getPublisherByName(name: string) : Promise<Publisher | null>
{
  try
  {
    const data = await pool.query('SELECT * FROM publisher WHERE name = $1', [name])
    if (data.rows.length === 0) return null;
    return data.rows[0];
  } 
  catch (error) 
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch publisher with name ${name}`);
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

export async function fetchListById(id: string): Promise<List>
{
  try
  {
    console.log(`Fetching list with id ${id}...`);
    const data = await pool.query('SELECT * FROM list WHERE id = $1', [id]);
    return data.rows[0];
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch list with id ${id}`);
  }
}

export async function fetchEditionsByListId(id: string): Promise<Edition[]>
{
  try
  {
    console.log(`Fetching editions by list with id ${id}...`);
    const data = await pool.query(
      'SELECT e.*FROM edition e JOIN list_edition le ON e.id = le.edition_id WHERE le.list_id = $1;',
      [id]);
    return data.rows;
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch editions by list with id ${id}`);
  }
}

export async function fetchUserByEmail(email: string): Promise<User | null> 
{
  try
  {
    console.log(`Fetching user with email ${email}...`);
    const data = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (data.rows.length === 0) return null;
    return data.rows[0];
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user with email ${email}`);
  }
}

export async function fetchUserById(id: string): Promise<User | null>
{
  try
  {
    console.log(`Fetching user with id ${id}...`);
    const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (data.rows.length === 0) return null;
    return data.rows[0];
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user with id ${id}`);
  }
}

export async function fetchListsByEditionId(id: string): Promise<List[]>
{
  try
  {
    console.log(`Fetching lists by edition with id ${id}...`);

    const data = await pool.query(
      'SELECT l.* FROM list l JOIN list_edition le ON l.id = le.list_id WHERE le.edition_id = $1;',
      [id]);

    return data.rows;
  }
  catch (error)
  {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch lists by edition with id ${id}`);
  }
}