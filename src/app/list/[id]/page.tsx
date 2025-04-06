
import { fetchEditionsByListId, fetchListById } from "@/app/lib/data";
import BookList from "./BookList";
import DeleteButton from "./DeleteButton";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const list = await fetchListById(id);

    if (!list) notFound()
    
    const editions = await fetchEditionsByListId(id);

    const session = await auth();
    const userId = session?.user?.id;

    const showSpines = editions.every(e => e.spine_img);

    return (
        <>
            <BookList list={list} showSpines={showSpines} editions={editions} />
            {userId === list.user_id && <DeleteButton id={list.id} />}
        </>
    )
}

