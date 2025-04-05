import { auth } from "@/app/auth";
import { fetchEditionsByListId, fetchListsByUserId } from "@/app/lib/data";
import BookList from "@/app/list/[id]/BookList";
import Heading from "@/components/Heading";
import CreateList from "./CreateNewList";

export default async function Profile() 
{
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

  const lists = await fetchListsByUserId(session.user.id!);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between items-center">
        <Heading size={3}>My lists</Heading>
        <CreateList userId={session.user.id!} />
      </div>
      <div className="flex flex-col gap-4">
        {lists.map(async list => 
        {
          const editions = await fetchEditionsByListId(list.id);
          const showSpines = editions.every(e => e.spine_img);
          return <div key={list.id}>
            <BookList list={list} showSpines={false && showSpines} editions={editions} />
          </div>
      })}
      </div>
    </div>
  );
}
