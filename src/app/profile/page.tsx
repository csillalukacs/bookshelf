import UserAvatar from "@/components/UserAvatar";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/app/auth";
import { fetchListsByUserId } from "../lib/data";
import LinkComponent from "@/components/LinkComponent";
import CreateList from "./lists/CreateNewList";

export default async function Profile() 
{
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

  const lists = await fetchListsByUserId(session.user.id!);

  return (
    <div >
      <div>
      </div>
      <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <UserAvatar />
        <SignOut />
      </div>
      <p>Hello {session.user.name}</p>
      <h1 className="text-xl">My lists</h1>
      <ul>
        {lists.map(list => <li key={list.id}><LinkComponent href={`/list/${list.id}`}>{list.name}</LinkComponent></li>)}
      </ul>
      <CreateList userId={session.user.id!} />
    </div>
  );
}
