import { fetchAuthorById, fetchBookById, fetchEditionById, fetchLanguageById, fetchPublisherById, getCoverUrl, getPublisherByName } from "@/app/lib/data";
import EditionPage from "./EditionPage";

export default async function Page({ params }: { params: { id: string, ed_id: string } }) 
{
    const { id, ed_id } = await params;

    const book = await fetchBookById(id);
    const edition = await fetchEditionById(ed_id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(edition.lang_id);
    const coverUrl = await getCoverUrl(edition);
    const publisher = await fetchPublisherById(edition.publisher_id);


    return (
        <EditionPage 
            coverUrl={coverUrl}
            edition={edition}
            book={book}
            author={author}
            language={language}
            publisher={publisher}
        />
    )
}