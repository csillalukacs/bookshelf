import { Author, Book, Edition, Language, Publisher } from "@/app/lib/definitions";
import Image from "next/image";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import UploadImage from "./UploadImage";
import AddToList from "@/components/AddToList";
import { fetchListsByUserId, fetchPublishers } from "@/app/lib/data";
import { auth } from "@/app/auth";
import EditPublisher from "./EditPublisher";
import EditDimensions from "./EditDimensions";


export default async function EditionPage( 
    {coverUrl, spineUrl, edition, book, author, language, publisher}:
    {coverUrl: string, spineUrl: string, edition: Edition, book: Book, author: Author, language: Language, publisher: Publisher}
) 
{
    const session = await auth();
    const lists = await fetchListsByUserId(session?.user?.id!);
    const publishers = await fetchPublishers();

    return (
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
                <UploadImage edition={edition} type="cover" />
                <UploadImage edition={edition} type="spine" />
                <AddToList edition={edition} lists={lists}/>
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
                        Published: {edition.year_pub} by <LinkComponent href={`/publisher/${publisher.id}`}>{publisher.name}</LinkComponent>
                    </p>
                    <EditPublisher edition={edition} publishers={publishers} />
                </div>
                <p>
                    Language: {language.name}
                </p>
                <div className="flex flex-row gap-2">
                    <p> Dimensions (mm): {edition.height} x {edition.width} x {edition.thickness}</p>
                    <EditDimensions edition={edition} />
                </div>
                <LinkComponent href={`/book/${book.id}`}>See all editions</LinkComponent>
            </div>
        </div>
    )
}
