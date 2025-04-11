import { fetchAuthorById, fetchBookById, fetchEditionById, fetchLanguageById, fetchListsByEditionId, fetchPublisherById } from "@/app/lib/data";
import { getCoverUrl, getSpineUrl } from "@/app/lib/utils";
import EditionPage from "./EditionPage";

export default async function Page({ params }: { params: { ed_id: string } }) 
{
    const { ed_id } = await params;

    const edition = await fetchEditionById(ed_id);
    const book = await fetchBookById(edition.book_id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(edition.lang_id);
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
        />
    )
}