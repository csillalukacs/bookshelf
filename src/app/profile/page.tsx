import { auth } from "@/app/auth";
import { fetchListsByUserId, fetchUserByEmail } from "../lib/data";
import LinkComponent from "@/components/LinkComponent";
import CreateList from "./lists/CreateNewList";
import EditUsername from "./EditUsername";
import Image from "next/image";

export default async function Profile() 
{
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

  const user = await fetchUserByEmail(session.user.email!);
  if (!user) return <>You are not signed in</>
  const lists = await fetchListsByUserId(user.id);

  return (
    <div >
      <div>
      </div>
      <Image
        src={'/user.png'}
        alt="profile picture"
        width={100}
        height={100}
        className=""
      />
      <p>Hello {user.username}</p>
      <p>Email: {session.user.email}</p>
      <p>Your username: {user.username} <EditUsername userId={user.id} /> </p>
      <h1 className="text-xl">My lists</h1>
      <ul>
        {lists.map(list => <li key={list.id}><LinkComponent href={`/list/${list.id}`}>{list.name}</LinkComponent></li>)}
      </ul>
      <CreateList userId={session.user.id!} />
    </div>
  );
}
