'use server'

import { fetchAuthors, fetchLanguages } from "@/app/lib/data";
import NewBookForm from "./NewBookForm";

export default async function Page() 
{
  const authors = await fetchAuthors();
  const languages = await fetchLanguages();

  return (
    <NewBookForm authors={authors} languages={languages}/>
  )
}


  

