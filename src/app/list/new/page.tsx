'use server'

import { auth } from "@/app/auth";
import NewListForm from "./NewListForm";

export default async function Page() 
{
  const session = await auth();

  if (!session?.user?.id) 
  {
    console.log(session)
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You must be logged in to create lists.</p>
      </div>
    );
  }

  return (
    <NewListForm userId={session.user.id}/>
  )
}
