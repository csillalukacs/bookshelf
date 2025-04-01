import { fetchAuthorById, fetchBooksByAuthorId } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import CardList from "@/components/CardList";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchAuthorById(id);
    const books = await fetchBooksByAuthorId(id);

    return (
        <main>
            <h3 className="text-2xl">{author.name}</h3>
            <button>
                Edit details
            </button>
            <CardList>
                {books.map(book => <BookCard key={book.id} book={book} /> )}
            </CardList>
        </main>
    )
}