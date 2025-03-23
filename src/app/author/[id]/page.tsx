import { fetchAuthorById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchAuthorById(id);

    return (
        <main>
            <h3 className="text-white text-2xl">{author.name}</h3>
            <button>
                Edit details
            </button>
        </main>
    )
}