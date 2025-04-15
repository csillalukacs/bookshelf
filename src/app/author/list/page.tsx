import { fetchAuthors } from "@/app/lib/data";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import AddAuthor from "./AddAuthor";
import { Metadata } from "next";

export const metadata: Metadata = 
{
    title: 'All Authors',
};

export default async function Page() 
{
  const authors = await fetchAuthors();

  return (
    <>
      <div className="flex flex-row gap-4 justify-between items-center w-full">
        <Heading size={3}>Authors</Heading>
        <AddAuthor />        
      </div>
      <ul className="self-start">
          {authors.map(a=>
            <li key={a.id}>
              <LinkComponent href={`/author/${a.id}`}>
                {a.name}
              </LinkComponent>
            </li>
          )}
      </ul>
    </>
  )
}