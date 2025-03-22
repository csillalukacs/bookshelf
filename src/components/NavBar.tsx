import Link from "next/link";


export default function NavBar() {
    return (
        <div className="m-2 flex gap-[24px] flex-wrap items-center justify-center">
            <Link href="/" >Home</Link>
            <Link href="/author/list" >Authors</Link>
            <Link href="/book/list" >Books</Link>
        </div>
        
    )
}
