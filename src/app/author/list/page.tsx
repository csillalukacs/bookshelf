import { fetchAuthors } from "@/app/lib/data";
import Link from "next/link";
import DeleteButton from "./delete-button";

export default async function Page() 
{
  const authors = await fetchAuthors();
  return (
    <>
      <h1>Authors</h1>
      <p>Is your favourite author missing? You can add them{" "}
          <Link href="/author/new">here</Link>.
      </p>
      <ul>
          {authors.map(a=>
            <li key={a.id}>
              <DeleteButton id={a.id}/>
              <Link href={`/author/${a.id}`}>
                {a.name}
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}