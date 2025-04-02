import { fetchBookById, fetchListsByUserId, getCoverUrl, getSpineUrl } from "@/app/lib/data";
import  Image from "next/image";
import { Edition, List } from "@/app/lib/definitions";
import Link from "next/link";
import { auth } from "@/app/auth";


export default async function SpineCard(
    { edition, linkToBook = false }: 
    { edition: Edition, linkToBook?: boolean })
{
    const spineUrl = await getSpineUrl(edition);
    const session = await auth();
    const book = await fetchBookById(edition.book_id);
    let list: List[] = [];
    if (session?.user?.id) list = await fetchListsByUserId(session.user.id!);

    return (
        <div key={edition.id} className={`relative inline-block bg-white w-[${edition.thickness * 10}px] h-[200px]`}>
            <Link 
                href={`/book/${book.id}` + (linkToBook ? '' : `/edition/${edition.id}`)} 
            >
                <Image 
                    src={spineUrl} 
                    alt={edition.ed_title} 
                    title={edition.ed_title + ', ' + edition.year_pub + ', ISBN:' + edition.isbn} 
                    width={edition.thickness*10} 
                    height={150}
                    className="object-cover w-full h-full hover:border-white hover:border-2 hover:rounded-lg hover:shadow-md"
                    style={{objectFit: 'cover'}}
                />
            </Link>
        </div>
    )

}