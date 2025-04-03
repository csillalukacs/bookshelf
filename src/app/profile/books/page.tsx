import { auth } from "@/app/auth";
import Link from "next/link";
import { fetchEditionsByListId, fetchListsByUserId } from "@/app/lib/data";
import Button from "@/components/Button";
import BookList from "@/app/list/[id]/BookList";
import Heading from "@/components/Heading";

export default async function Profile() 
{
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

  const lists = await fetchListsByUserId(session.user.id!);

  return (
    <div >
      <Heading size={3}>My lists</Heading>
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
      <Link href={'/list/new'}><Button label="Create a new list" disabled={false} /></Link>
    </div>
  );
}
