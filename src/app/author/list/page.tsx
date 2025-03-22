import { fetchAuthors } from "@/app/lib/data";
import Link from "next/link";

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
          {authors.map(a=><li key={a.id}><Link href={`/author/${a.id}`}>{a.name}</Link></li>)}
      </ul>
    </>
  )
}