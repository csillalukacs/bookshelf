import { fetchAuthorById, fetchBookById, fetchLanguageById } from "@/app/lib/data";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const book = await fetchBookById(id);
    console.log(book);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(book.orig_lang_id);

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
            </div>
        </main>
    )
}