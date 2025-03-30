import { fetchAuthorById, fetchBookById, fetchBookEditionsByBookId, fetchLanguageById, getCoverUrl } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

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
                <Link href={`/book/${id}/edition/new`}>Add a new edition</Link>
                <p>Editions</p>
                <ul>
                    {editions.map(async (edition) => {
                        const coverUrl = await getCoverUrl(edition);
                        return (
                            <li key={edition.id}>
                                <Image src={coverUrl} alt={edition.ed_title} width={100} height={150}></Image>
                                <Link href={`/book/${id}/edition/${edition.id}`}>
                                    {edition.ed_title}
                                </Link>
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </main>
    )
}