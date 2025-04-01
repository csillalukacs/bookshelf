import { fetchBooks } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import Button from "@/components/Button";
import CardList from "@/components/CardList";
import Link from "next/link";

export default async function Page() 
{
  const books = await fetchBooks();
  return (
    <>
      <h1>Books</h1>
      <Link href="/book/new"><Button label="Add a new book" disabled={false} /></Link>.
      <CardList>
          {books.map(book => <BookCard key={book.id} book={book} /> )}
      </CardList>
    </>
  )
}