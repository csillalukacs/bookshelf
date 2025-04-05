import { fetchAuthors, fetchBooks, fetchLanguages } from "@/app/lib/data";
import AddABook from "./AddABook";
import BookCard from "@/components/BookCard";
import CardList from "@/components/CardList";
import Heading from "@/components/Heading";
import { TextInput } from "@/components/TextInput";

export default async function Page() {
  const books = await fetchBooks();
  const authors = await fetchAuthors();
  const languages = await fetchLanguages();

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <Heading size={3}>Books</Heading>
        <AddABook authors={authors} languages={languages} />
      </div>
      <TextInput disabled={false} name="search" placeholder="Search" />
      <CardList>
        {books.map(book => <BookCard key={book.id} book={book} />)}
      </CardList>
    </>
  )
}