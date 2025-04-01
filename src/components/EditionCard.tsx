import { getCoverUrl } from "@/app/lib/data";
import  Image from "next/image";
import { Book, Edition } from "@/app/lib/definitions";
import Link from "next/link";


export default async function EditionCard({ edition, book, linkToBook = false }: 
    { edition: Edition, book: Book, linkToBook?: boolean })
{
    const coverUrl = await getCoverUrl(edition);

    return (
        <div key={edition.id} className="inline-block bg-white w-[100px] h-[150px] rounded-lg">
            <Link 
                href={`/book/${book.id}` + (linkToBook ? '' : `/edition/${edition.id}`)} 
            >
                <Image 
                    src={coverUrl} 
                    alt={edition.ed_title} 
                    title={edition.ed_title + ', ' + edition.year_pub + ', ISBN:' + edition.isbn} 
                    width={100} 
                    height={150}
                    className="rounded-lg object-cover w-full h-full hover:border-white hover:border-2 hover:shadow-md"
                    style={{objectFit: 'cover'}}
                />
            </Link>
        </div>
    )

}