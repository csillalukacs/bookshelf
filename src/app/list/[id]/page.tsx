
import { fetchEditionsByListId, fetchListById } from "@/app/lib/data";
import BookList from "./BookList";
import DeleteButton from "./DeleteButton";


export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const list = await fetchListById(id);
    const editions = await fetchEditionsByListId(id);

    const showSpines = editions.every(e => e.spine_img);

    return (
        <>
            <BookList list={list} showSpines={showSpines} editions={editions} />
            <DeleteButton id={list.id} />
        </>
    )
}

