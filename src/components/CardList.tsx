export default function CardList({children}: {children: React.ReactNode})
{
    return (
        <ul className="flex flex-row flex-wrap gap-1 justify-start bg-gray-100 p-2 py-4 rounded-lg w-full">
            {children}
        </ul>
    )
}