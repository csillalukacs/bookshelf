import { fetchEditionsByPublisherId } from "@/app/actions/edition-actions";
import { fetchPublisherById } from "@/app/lib/data";
import CardList from "@/components/CardList";
import EditionCard from "@/components/EditionCard";
import Heading from "@/components/Heading";

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchPublisherById(id);
    const editions = await fetchEditionsByPublisherId(id);

    return (
        <div>
            <Heading size={2}>{author.name}</Heading>
            <button>
                Edit details
            </button>
            <CardList>
                {editions.map(edition => <EditionCard key={edition.id} edition={edition} /> )}
            </CardList>
        </div>
    )
}