import { Author, Book, Edition, Language, List, Publisher } from "@/app/lib/definitions";
import Image from "next/image";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import UploadImage from "./UploadImage";
import AddToList from "@/components/AddToList";
import { fetchEditionsByListId, fetchListsByUserId, fetchPublishers } from "@/app/lib/data";
import { auth } from "@/app/auth";
import EditPublisher from "./EditPublisher";
import EditDimensions from "./EditDimensions";
import DeleteButton from "./DeleteButton";
import BookList from "@/app/list/[id]/BookList";
import EditYear from "./EditYear";
import EditLanguage from "./EditLanguage";


export default async function EditionPage( 
    {coverUrl, spineUrl, edition, book, author, language, publisher, containingLists, languages}:
    {coverUrl: string, spineUrl: string, edition: Edition, book: Book, author: Author, 
        language: Language, publisher: Publisher, containingLists: List[], languages: Language[]}
) 
{
    const session = await auth();
    let userLists: List[] = [];
    if (session?.user?.id) userLists = await fetchListsByUserId(session?.user?.id);
    const publishers = await fetchPublishers();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 items-center">
                    <div className="flex flex-row gap-2">
                        {spineUrl && <Image 
                            src={spineUrl} 
                            alt={edition.ed_title} 
                            width={edition.thickness * (200/edition.height)} 
                            height={200}
                        />}
                        <Image 
                            src={coverUrl} 
                            alt={edition.ed_title} 
                            width={150} 
                            height={200}
                        />
                    </div>
                    { session?.user?.id && 
                    <>
                        <UploadImage edition={edition} type="cover" />
                        <UploadImage edition={edition} type="spine" />
                        <AddToList edition={edition} lists={userLists}/>
                    </>
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0">
                        <Heading size={2}>{edition.ed_title}</Heading>
                        <LinkComponent href={`/author/${author.id}`}>
                            {author.name}
                        </LinkComponent>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>
                            Published: {edition.year_pub} <EditYear edition={edition} />
                            {" "} by <LinkComponent href={`/publisher/${publisher.id}`}>{publisher.name}</LinkComponent>
                        </p>
                        { session && <EditPublisher edition={edition} publishers={publishers} />}
                    </div>
                    <p>ISBN: {edition.isbn} </p>
                    <p>
                        Language: {language.name}
                        {" "}<EditLanguage edition={edition} languages={languages} />
                    </p>
                    <div className="flex flex-row gap-2">
                        <p> Dimensions (mm): {edition.height} x {edition.width} x {edition.thickness}</p>
                        { session && <EditDimensions edition={edition} />}
                    </div>
                    <LinkComponent href={`/book/${book.id}`}>See all editions</LinkComponent>
                    { session &&<DeleteButton id={edition.id} bookId={book.id} />}
                </div>
            </div>
            { containingLists.length > 0 &&
                <div className="flex flex-col gap-4">
                    <Heading size={3}>Shelves containing this edition:</Heading>
                    {containingLists.map(async list => 
                    {
                        const editions = await fetchEditionsByListId(list.id);
                        return <div key={list.id}>
                            <BookList list={list} view={"cover"} allowViewSwitch={false} editions={editions} />
                        </div>
                    })}
                </div>
            }
        </>
    )
}
