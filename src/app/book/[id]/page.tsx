import { fetchAuthorById, fetchBookById, fetchBookEditionsByBookId, fetchLanguageById, getCoverUrl } from "@/app/lib/data";
import Link from "next/link";
import EditionCard from "@/components/EditionCard";
import CardList from "@/components/CardList";
import Button from "@/components/Button";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const book = await fetchBookById(id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(book.orig_lang_id);
    const editions = await fetchBookEditionsByBookId(id);

    return (
        <main>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl">{book.title}</h3>
                <Link href={`/author/${author.id}`}>
                    {author.name}
                </Link>
                <p>
                    First published: {book.first_pub}
                </p>
                <p>
                    Original language: {language.name}
                </p>
                <button>
                    Edit details
                </button>
                <Link href={`/book/${id}/edition/new`}><Button label="Add a new edition" disabled={false} /></Link>
                <p>Editions</p>
                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard key={edition.id} edition={edition} book={book} />
                        )
                    }
                </CardList>
            </div>
        </main>
    )
}