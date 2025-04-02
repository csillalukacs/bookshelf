import { SignOut } from "@/components/sign-out";
import Link from "next/link";
import { auth } from "@/app/auth";
import SignIn from "@/components/sign-in";
import AddABook from "@/components/AddABook";
import { fetchAuthors, fetchLanguages } from "../lib/data";
import Heading from "@/components/Heading";

export default async function Home() 
{
  const session = await auth();
  const authors = await fetchAuthors();
  const languages = await fetchLanguages();
  
  return (
    <div >
      <div className="flex flex-col gap-[24px] items-center justify-start">
        <Heading size={4}>What's on your shelf?</Heading>
        <img src="/bookshelf.svg"></img>
      </div>
    </div>
  );
}
