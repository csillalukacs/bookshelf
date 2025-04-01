import Link from "next/link";

export default function LinkComponent({href, nav, children}: {href: string, nav?: boolean, children: React.ReactNode})
{
    return (
        <Link 
            href={href}
            className={"text-amber-700 hover:text-amber-900" + (nav ? " text-xl font-bold " : "")}
        >
            {children}
        </Link>)
}