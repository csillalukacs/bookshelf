
import { fetchEditionsByListId, fetchListById, fetchUserById } from "@/app/lib/data";
import BookList from "./BookList";
import DeleteButton from "./DeleteButton";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import { View, Props } from "@/app/lib/definitions";
import { Metadata } from "next";
   

export async function generateMetadata({ params }: Props ): Promise<Metadata> 
{
    const { id } = await params
    const list = await fetchListById(id);
    const user = await fetchUserById(list.user_id);

    return { title: `${list.name} | ${user?.username}` }
}

function isValidView(view: string | string[] | null | undefined): view is View
{
    if (!view) return false;
    if (typeof view === "string") return ["cover", "spine", "3d"].includes(view);

    return false;
}

export default async function Page({ params, searchParams }: Props)
{
    const {id} = await params;
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

