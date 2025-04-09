import { fetchEditionsByListId, fetchListsByUserId, fetchUserById } from "@/app/lib/data";
import Heading from "@/components/Heading";
import { notFound } from "next/navigation";
import Bookshelf from "./Bookshelf";
import BookList from "@/app/list/[id]/BookList";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const user = await fetchUserById(id);

    if (!user) notFound();

    const lists = await fetchListsByUserId(id);
    const featuredBooks = await fetchEditionsByListId(lists[0].id);


    return (
        <div className="flex flex-col gap-4 w-full">
            <Heading size={4}>{user.username}</Heading>
            <Bookshelf list={featuredBooks}/>
            <div className="flex flex-col gap-4">
                {lists.map(async list => {
                    const editions = await fetchEditionsByListId(list.id);
                    return <div key={list.id}>
                        <BookList list={list} showSpines={false} editions={editions} />
                    </div>
                })}
            </div>
        </div>
    )
}