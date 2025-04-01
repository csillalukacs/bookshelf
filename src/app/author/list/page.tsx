import { fetchAuthors } from "@/app/lib/data";
import Link from "next/link";
import DeleteButton from "./delete-button";
import { auth } from "@/app/auth";
import Button from "@/components/Button";

export default async function Page() 
{
  const authors = await fetchAuthors();
  const session = await auth();

  return (
    <>
      <h1>Authors</h1>
      <Link href="/author/new"><Button label="Add a new author" disabled={false} /></Link>.
      <ul className="self-start">
          {authors.map(a=>
            <li key={a.id}>
              {session && <DeleteButton id={a.id}/>}
              <Link href={`/author/${a.id}`}>
                {a.name}
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}