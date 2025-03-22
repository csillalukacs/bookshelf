import { fetchAuthorById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchAuthorById(id);

    return (
        <main>
            {author.name}
        </main>
    )
}