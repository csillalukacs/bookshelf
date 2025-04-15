import { auth } from "@/app/auth";
import { fetchEditionsByListId, fetchListsByUserId } from "@/app/lib/data";
import BookList from "@/app/list/[id]/BookList";
import Heading from "@/components/Heading";
import CreateList from "./CreateNewList";
import { Metadata } from "next";

export const metadata: Metadata = 
{
    title: 'My Lists',
};

export default async function Profile() 
{
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

  const lists = await fetchListsByUserId(session.user.id!);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <Heading size={3}>My lists</Heading>
        <CreateList userId={session.user.id!} />
      </div>
      <div className="flex flex-col gap-4">
        {lists.map(async list => 
        {
          const editions = await fetchEditionsByListId(list.id);
          return <div key={list.id}>
            <BookList list={list} view={"cover"} allowViewSwitch={false} editions={editions} />
          </div>
      })}
      </div>
    </div>
  );
}
