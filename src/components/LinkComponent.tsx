import Link from "next/link";

export default function LinkComponent(
    {href, nav, children}: 
    {href: string, nav?: boolean, children: React.ReactNode}
)
{
    return (
        <Link 
            href={href}
            className={nav ? 
                "text-xl text-[var(--light)] hover:text-[var(--light-hover)]" 
                : "text-[var(--dark)] hover:text-[var(--dark-hover)]"}
        >
            {children}
        </Link>)
}