import UserAvatar from "@/components/UserAvatar";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  if (!session?.user) return <>You are not signed in</>

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
    </div>
  );
}
