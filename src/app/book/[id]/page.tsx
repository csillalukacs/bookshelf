import { fetchAuthorById, fetchAuthors, fetchBookById, fetchBookEditionsByBookId, fetchLanguageById, fetchLanguages, fetchPublishers } from "@/app/lib/data";
import EditionCard from "@/components/EditionCard";
import CardList from "@/components/CardList";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import { DeleteBookButton } from "./DeleteBook";
import AddEdition from "@/app/book/[id]/AddEdition";
import EditAuthor from "./EditAuthor";
import { auth } from "@/app/auth";
import { Metadata } from "next";
import { Props } from "@/app/lib/definitions";
import EditYear from "./EditYear";
import EditLanguage from "./EditLanguage";
import EditTitle from "./EditTitle";
   
export async function generateMetadata({ params }: Props ): Promise<Metadata> 
{
    const { id } = await params

    const book = await fetchBookById(id);
    const author = await fetchAuthorById(book.author_id);

    return { title: `${book.title} by ${author.name}`}
}

export default async function Page({ params }: Props) 
{
    const {id }= await params;
    const book = await fetchBookById(id);
    const author = await fetchAuthorById(book.author_id);
    const language = await fetchLanguageById(book.orig_lang_id);
    const editions = await fetchBookEditionsByBookId(id);
    const authors = await fetchAuthors();
    const languages = await fetchLanguages();
    const publishers = await fetchPublishers();
    
    const session = await auth();

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0">
                    <div className="flex flex-row gap-2">
                        <Heading size={2}>{book.title}</Heading>
                        <EditTitle book={book} />
                    </div>
                    <div className="flex flex-row gap-2">
                        <LinkComponent href={`/author/${author.id}`}>
                            {author.name}
                        </LinkComponent>
                        { session && <EditAuthor book={book} authors={authors} />}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <p>
                        First published: {book.first_pub}
                    </p>
                    { session && <EditYear book={book} />}
                </div>
                <div className="flex flex-row gap-2">
                    <p>
                        Original language: {language.name}
                    </p>
                    { session && <EditLanguage book={book} languages={languages} />}
                </div>
                { session && <AddEdition book={book} languages={languages} publishers={publishers} />}
                <Heading size={1}>Editions</Heading>
                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard key={edition.id} edition={edition} />
                        )
                    }
                </CardList>
                { session && <DeleteBookButton book={book} />}
            </div>
        </div>
    )
}