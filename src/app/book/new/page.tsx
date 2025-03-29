'use server'

import { fetchAuthors, fetchLanguages } from "@/app/lib/data";
import NewBookForm from "./NewBookForm";
import { auth } from "@/app/auth";

export default async function Page() 
{
  const session = await auth();

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

  return (
    <NewBookForm authors={authors} languages={languages}/>
  )
}


  

