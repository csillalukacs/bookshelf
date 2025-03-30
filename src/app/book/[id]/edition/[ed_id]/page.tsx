import { fetchAuthorById, fetchBookById, fetchEditionById, fetchLanguageById, getCoverUrl } from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string, ed_id: string } }) 
{
    const { id, ed_id } = await params;

    const book = await fetchBookById(id);
    const edition = await fetchEditionById(ed_id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(edition.lang_id);
    const coverUrl = await getCoverUrl(edition);


    return (
        <main>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl">{book.title}</h3>
                <Link href={`/author/${author.id}`}>
                    {author.name}
                </Link>
                <p>
                    Published: {edition.year_pub}
                </p>
                <p>
                    Language: {language.name}
                </p>
                <button>
                    Edit details
                </button>
                <li key={edition.id}>
                    <Image src={coverUrl} alt={edition.ed_title} width={100} height={150}></Image>
                </li>
            </div>
        </main>
    )
}