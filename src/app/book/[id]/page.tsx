import { fetchAuthorById, fetchAuthors, fetchBookById, fetchBookEditionsByBookId, fetchLanguageById, fetchLanguages, fetchPublishers } from "@/app/lib/data";
import EditionCard from "@/components/EditionCard";
import CardList from "@/components/CardList";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import { DeleteBookButton } from "./DeleteBook";
import AddEdition from "@/app/book/[id]/AddEdition";
import EditAuthor from "./EditAuthor";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const book = await fetchBookById(id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(book.orig_lang_id);
    const editions = await fetchBookEditionsByBookId(id);
    const authors = await fetchAuthors();
    const languages = await fetchLanguages();
    const publishers = await fetchPublishers();

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0">
                    <Heading size={2}>{book.title}</Heading>
                    <div className="flex flex-row gap-2">
                        <LinkComponent href={`/author/${author.id}`}>
                            {author.name}
                        </LinkComponent>
                        <EditAuthor book={book} authors={authors} />
                    </div>
                </div>
                <p>
                    First published: {book.first_pub}
                </p>
                <p>
                    Original language: {language.name}
                </p>
                <AddEdition book={book} authors={authors} languages={languages} publishers={publishers} />
                <p>Editions</p>
                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard key={edition.id} edition={edition} />
                        )
                    }
                </CardList>
                <DeleteBookButton book={book} />
            </div>
        </div>
    )
}