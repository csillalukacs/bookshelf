import { auth } from "@/app/auth";
import AccountMenu from "./AccountMenu";
import LinkComponent from "./LinkComponent";
import Heading from "./Heading";
import SignIn from "./sign-in";
import Logo from "./Logo";


export default async function NavBar() 
{
    const session = await auth();

    return (
        <div className="bg-orange-100 shadow-md">
        <div className="container w-m mx-auto">
            <div className="flex flex-row gap-4 justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <Logo />
                    <LinkComponent href={"/home"}>
                        <Heading size={4}>Bookshelf</Heading>
                    </LinkComponent>
                </div>
                <div className="flex gap-[24px] flex-wrap items-center justify-center ">
                    <LinkComponent href="/author/list" nav={true}>Authors</LinkComponent>
                    <LinkComponent href="/book/list" nav={true}>Books</LinkComponent>
                    {session ? <AccountMenu /> : <SignIn/>}
                </div>
            </div>
        </div>
        </div>
    )
}
