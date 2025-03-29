import Link from "next/link";
import { SignOut } from "./sign-out";
import { auth } from "@/app/auth";


export default async function NavBar() 
{
    const session = await auth();
    return (
        <div className="m-2 flex gap-[24px] flex-wrap items-center justify-center">
            <Link href="/home" >Home</Link>
            <Link href="/author/list" >Authors</Link>
            <Link href="/book/list" >Books</Link>
            {session && <SignOut />}
        </div>
        
    )
}
