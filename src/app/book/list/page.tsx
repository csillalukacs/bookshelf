import { fetchBooks } from "@/app/lib/data";
import Link from "next/link";

export default async function Page() 
{
  const books = await fetchBooks();
  return (
    <>
      <h1>Authors</h1>
      <p>Is your favourite book missing? You can add it{" "}
          <Link href="/book/new">here</Link>.
      </p>
      <ul className="self-start">
          {books.map(book=>
            <li key={book.id}>
              <Link href={`/book/${book.id}`}>
                {book.title}
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}