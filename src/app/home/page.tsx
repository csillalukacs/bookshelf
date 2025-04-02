import { SignOut } from "@/components/sign-out";
import Link from "next/link";
import { auth } from "@/app/auth";
import SignIn from "@/components/sign-in";
import AddABook from "@/components/AddABook";
import { fetchAuthors, fetchLanguages } from "../lib/data";

export default async function Home() 
{
  const session = await auth();
  const authors = await fetchAuthors();
  const languages = await fetchLanguages();
  
  return (
    <div >
        <div>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
          </div>
        </div>
      <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/author/new"
        >
          Add author
        </Link>
        <AddABook authors={authors} languages={languages} />
        {session ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
}
