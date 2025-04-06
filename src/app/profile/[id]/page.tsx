import { fetchEditionsByListId, fetchListsByUserId, fetchUserById } from "@/app/lib/data";
import BookList from "@/app/list/[id]/BookList";
import Heading from "@/components/Heading";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const user = await fetchUserById(id);

    if (!user) notFound();

    const lists = await fetchListsByUserId(id);


    return (
        <div>
            <Heading size={4}>{user.username}</Heading>
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