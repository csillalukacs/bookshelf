import { fetchAuthorById, fetchBooksByAuthorId } from "@/app/lib/data";
import Link from "next/link";

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
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <Link href={`/book/${book.id}`}>
                            {book.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}