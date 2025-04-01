import { fetchAuthorById, fetchBooksByAuthorId } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import CardList from "@/components/CardList";
import Heading from "@/components/Heading";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchAuthorById(id);
    const books = await fetchBooksByAuthorId(id);

    return (
        <div>
            <Heading size={2}>{author.name}</Heading>
            <button>
                Edit details
            </button>
            <CardList>
                {books.map(book => <BookCard key={book.id} book={book} /> )}
            </CardList>
        </div>
    )
}