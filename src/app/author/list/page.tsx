import { fetchAuthors } from "@/app/lib/data";
import DeleteButton from "./delete-button";
import { auth } from "@/app/auth";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import AddAuthor from "@/components/AddAuthor";

export default async function Page() 
{
  const authors = await fetchAuthors();
  const session = await auth();

  return (
    <>
      <Heading size={3}>Authors</Heading>
      <AddAuthor />
      <ul className="self-start">
          {authors.map(a=>
            <li key={a.id}>
              {session && <DeleteButton id={a.id}/>}
              <LinkComponent href={`/author/${a.id}`}>
                {a.name}
              </LinkComponent>
            </li>
          )}
      </ul>
    </>
  )
}