import { fetchAuthorById, fetchBookById, fetchEditionById, fetchLanguageById, fetchLanguages, fetchListsByEditionId, fetchPublisherById } from "@/app/lib/data";
import { getCoverUrl, getSpineUrl } from "@/app/lib/utils";
import EditionPage from "./EditionPage";
import { Metadata } from "next";
import { Props } from "@/app/lib/definitions";
   
export async function generateMetadata({ params }: Props ): Promise<Metadata> 
{
    const { id } = await params;

    const edition = await fetchEditionById(id);
    const book = await fetchBookById(edition.book_id);
    const author = await fetchAuthorById(book.author_id);

    return { title: `${edition.ed_title} by ${author.name}`}
}

export default async function Page({ params }: { params: { id: string } }) 
{
    const { id } = await params;

    const edition = await fetchEditionById(id);
    const book = await fetchBookById(edition.book_id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(edition.lang_id);
    const languages = await fetchLanguages();
    const coverUrl = getCoverUrl(edition);
    const spineUrl = getSpineUrl(edition);
    const publisher = await fetchPublisherById(edition.publisher_id);
    const containingLists = await fetchListsByEditionId(edition.id);


    return (
        <EditionPage 
            coverUrl={coverUrl}
            spineUrl={spineUrl}
            edition={edition}
            book={book}
            author={author}
            language={language}
            publisher={publisher}
            containingLists={containingLists}
            languages={languages}
        />
    )
}