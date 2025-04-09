import { fetchBookById, fetchListsByUserId } from "@/app/lib/data";
import { getCoverUrl } from "@/app/lib/utils";
import  Image from "next/image";
import { Edition, List } from "@/app/lib/definitions";
import Link from "next/link";
import CardMenu from "./CardMenu";
import { auth } from "@/app/auth";


export default async function EditionCard(
    { edition, linkToBook = false, currentList }: 
    { edition: Edition, linkToBook?: boolean, currentList?: List })
{
    const coverUrl = getCoverUrl(edition);
    const session = await auth();
    const book = await fetchBookById(edition.book_id);
    let list: List[] = [];
    if (session?.user?.id) list = await fetchListsByUserId(session.user.id!);

    return (
        <div key={edition.id} className="relative inline-block bg-white w-[100px] h-[150px] rounded-lg">
            {!linkToBook && session?.user?.id &&
                <CardMenu edition={edition} lists={list} currentList={currentList} userId={session.user.id} />
            }
            <Link 
                href={ linkToBook ? `/book/${book.id}` : `/edition/${edition.id}`} 
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