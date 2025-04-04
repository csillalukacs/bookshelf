import { Author, Book, Edition, Language, Publisher } from "@/app/lib/definitions";
import Image from "next/image";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import UploadImage from "./UploadImage";
import AddToList from "@/components/AddToList";
import { fetchAuthors, fetchListsByUserId } from "@/app/lib/data";
import { auth } from "@/app/auth";
import EditAuthor from "./EditAuthor";


export default async function EditionPage( 
    {coverUrl, spineUrl, edition, book, author, language, publisher}:
    {coverUrl: string, spineUrl: string, edition: Edition, book: Book, author: Author, language: Language, publisher: Publisher}
) 
{
    const session = await auth();
    const lists = await fetchListsByUserId(session?.user?.id!);
    const authors = await fetchAuthors();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 items-center">
                <div className="flex flex-row gap-2">
                    {spineUrl && <Image 
                        src={spineUrl} 
                        alt={edition.ed_title} 
                        width={edition.thickness * 10} 
                        height={200}
                    />}
                    <Image 
                        src={coverUrl} 
                        alt={edition.ed_title} 
                        width={150} 
                        height={200}
                    />
                </div>
                <UploadImage edition={edition} type="cover" />
                <UploadImage edition={edition} type="spine" />
                <AddToList edition={edition} lists={lists}/>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0">
                    <Heading size={2}>{edition.ed_title}</Heading>
                    <div className="flex flex-row gap-2">
                        <LinkComponent href={`/author/${author.id}`}>
                            {author.name}
                        </LinkComponent>
                        <EditAuthor book={book} authors={authors} />
                    </div>
                </div>
                <p>
                    Published: {edition.year_pub} by {publisher.name}
                </p>
                <p>
                    Language: {language.name}
                </p>
                <LinkComponent href={`/book/${book.id}`}>See all editions</LinkComponent>
            </div>
        </div>
    )
}
