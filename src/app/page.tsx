import Image from "next/image";
import UserAvatar from "@/components/UserAvatar";
import { SignOut } from "@/components/sign-out";
import Link from "next/link";

export default function Home() {
  return (
    <div >
        <UserAvatar/>
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
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Add book
        </a>
        <SignOut />
      </div>
    </div>
  );
}
