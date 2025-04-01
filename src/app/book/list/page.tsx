import { fetchBooks } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import Button from "@/components/Button";
import CardList from "@/components/CardList";
import Heading from "@/components/Heading";
import Link from "next/link";

export default async function Page() 
{
  const books = await fetchBooks();
  return (
    <>
      <Heading size={3}>Books</Heading>
      <Link href="/book/new"><Button label="Add a new book" disabled={false} /></Link>
      <CardList>
          {books.map(book => <BookCard key={book.id} book={book} /> )}
      </CardList>
    </>
  )
}