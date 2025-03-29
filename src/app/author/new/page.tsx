import { auth } from "@/app/auth";
import NewAuthorForm from "./NewAuthorForm";

export default async function Page() 
{
  const session = await auth();
  if (!session) 
  {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You must be logged in to add an author.</p>
      </div>
    );
  }
  return (
    <NewAuthorForm />
  )
}


  
