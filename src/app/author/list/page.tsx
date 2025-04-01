import { fetchAuthors } from "@/app/lib/data";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { auth } from "@/app/auth";
import Button from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";

export default async function Page() 
{
  const authors = await fetchAuthors();
  const session = await auth();

  return (
    <>
      <Heading>Authors</Heading>
      <Link href="/author/new"><Button label="Add a new author" disabled={false} /></Link>
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