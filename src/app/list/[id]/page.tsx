
import EditionCard from "@/components/EditionCard";
import CardList from "@/components/CardList";

import Heading from "@/components/Heading";
import { fetchEditionsByListId, fetchListById } from "@/app/lib/data";


export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const list = await fetchListById(id);
    const editions = await fetchEditionsByListId(id);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Heading size={2}>{list.name}</Heading>

                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard key={edition.id} edition={edition} />
                        )
                    }
                </CardList>
            </div>
        </div>
    )
}

