
import { fetchEditionsByListId, fetchListById } from "@/app/lib/data";
import BookList from "./BookList";
import DeleteButton from "./DeleteButton";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import { View } from "@/app/lib/definitions";

function isValidView(view: string | string[] | null | undefined): view is View
{
    if (!view) return false;
    if (typeof view === "string") return ["cover", "spine", "3d"].includes(view);

    return false;
}

export default async function Page({ params, searchParams }: 
    { params: { id: string }, searchParams: Promise<{ [key: string]: string | string[] | undefined}> })
{
    const id = params.id;
    const list = await fetchListById(id);

    const viewQueryParam = (await searchParams).view;
    if (!list) notFound()
    
    const editions = await fetchEditionsByListId(id);

    const session = await auth();
    const userId = session?.user?.id;

    return (
        <>
            <BookList 
                list={list} 
                view={isValidView(viewQueryParam) ? viewQueryParam : "cover"} 
                allowViewSwitch={true}
                editions={editions} 
            />
            { userId === list.user_id && <DeleteButton id={list.id} /> }
        </>
    )
}

