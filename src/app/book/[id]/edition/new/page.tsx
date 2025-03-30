'use server'

import { fetchAuthors, fetchBookById, fetchLanguages } from "@/app/lib/data";
import NewEditionForm from "./NewEditionForm";
import { auth } from "@/app/auth";

export default async function Page({params}: { params: { id: string } }) 
{
  const session = await auth();
  const bookId = params.id;


  if (!session) 
  {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You must be logged in to add a book.</p>
      </div>
    );
  }

  const authors = await fetchAuthors();
  const languages = await fetchLanguages();
  const book = await fetchBookById(bookId);

  return (
    <NewEditionForm authors={authors} languages={languages} book={book} publishers={[]}/>
  )
}
