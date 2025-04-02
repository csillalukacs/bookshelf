import { getOneEdition } from "@/app/lib/data";
import { Book } from "@/app/lib/definitions";
import Link from "next/link";
import EditionCard from "./EditionCard";


export default async function BookCard({ book }: 
    { book: Book })
{
    const edition = await getOneEdition(book.id);

    if (!edition) {
        return <div className="w-[100px] h-[150px] bg-white">
            <Link href={`/book/${book.id}`} >
                {book.title}
            </Link>
        </div>
    }

    return (
        <EditionCard 
            edition={edition} 
            linkToBook={true}
        />
    )

}