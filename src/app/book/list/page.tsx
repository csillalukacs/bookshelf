import { fetchBooks } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import CardList from "@/components/CardList";
import Link from "next/link";

export default async function Page() 
{
  const books = await fetchBooks();
  return (
    <>
      <h1>Books</h1>
      <p>Is your favourite book missing? You can add it{" "}
          <Link href="/book/new">here</Link>.
      </p>
      <CardList>
          {books.map(book => <BookCard key={book.id} book={book} /> )}
      </CardList>
    </>
  )
}