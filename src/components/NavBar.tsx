import { auth } from "@/app/auth";
import AccountMenu from "./AccountMenu";
import LinkComponent from "./LinkComponent";
import Heading from "./Heading";
import SignIn from "./sign-in";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";


export default async function NavBar() 
{
    const session = await auth();
    const userId = session?.user?.id;

    return (
        <div className="bg-[var(--dark)] text-white shadow-md font-family-[var(--font-header)]">
            <div className="container w-[70%] mx-auto">
                <div className="flex flex-row gap-4 justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                        <Logo />
                        <LinkComponent nav={true} href={"/home"}>
                            <Heading size={4}>Bookshelf</Heading>
                        </LinkComponent>
                    </div>
                    <div className="flex gap-[24px] flex-wrap items-center justify-center ">
                        {userId && <LinkComponent href="/profile/lists" nav={true}>My Lists</LinkComponent>}
                        <LinkComponent href="/publisher/list" nav={true}>Publishers</LinkComponent>
                        <LinkComponent href="/author/list" nav={true}>Authors</LinkComponent>
                        <LinkComponent href="/book/list" nav={true}>Books</LinkComponent>
                        {userId ? <AccountMenu userId={userId}><UserAvatar userId={userId} /></AccountMenu> : <SignIn/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
