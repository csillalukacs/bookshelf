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
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/book/new"
        >
          Add book
        </Link>
        <SignOut />
      </div>
    </div>
  );
}
