
import EditionCard from "@/components/EditionCard";
import CardList from "@/components/CardList";
import Heading from "@/components/Heading";
import { fetchEditionsByListId, fetchListById } from "@/app/lib/data";
import SpineCard from "@/components/SpineCard";


export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const list = await fetchListById(id);
    const editions = await fetchEditionsByListId(id);

    const showSpines = editions.every(e => e.spine_img);

    return (
            <div className="flex flex-col gap-4 w-full">
                <Heading size={2}>{list.name}</Heading>
                {showSpines ?<div className="mx-auto flex flex-row">
                    {editions.map(async (edition) => 
                        <SpineCard key={edition.id} edition={edition} />
                    )
                    }
                </div> :
                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard key={edition.id} edition={edition} />
                        )
                    }
                </CardList>}
            </div>
    )
}

