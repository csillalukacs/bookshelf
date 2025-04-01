import { auth } from "@/app/auth";
import AccountMenu from "./AccountMenu";
import LinkComponent from "./LinkComponent";


export default async function NavBar() 
{
    const session = await auth();

    return (
        <div className="flex gap-[24px] flex-wrap items-center justify-center bg-orange-100 shadow-md h-[60px]">
            <LinkComponent href="/home" nav={true}>Home</LinkComponent>
            <LinkComponent href="/author/list" nav={true}>Authors</LinkComponent>
            <LinkComponent href="/book/list" nav={true}>Books</LinkComponent>
            {session && <AccountMenu />}
        </div>
    )
}
