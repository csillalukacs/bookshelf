export default function CardList({children}: {children: React.ReactNode})
{
    return (
        <ul className="flex flex-row flex-wrap gap-4 justify-start">
            {children}
        </ul>
    )
}