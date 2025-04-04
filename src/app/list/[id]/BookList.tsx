import CardList from "@/components/CardList";
import EditionCard from "@/components/EditionCard";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import SpineCard from "@/components/SpineCard";

export default function BookList({list, showSpines, editions} : 
    { list: any, showSpines: boolean, editions: any[] }
)
{
    return (
        <div className="flex flex-col gap-4 w-full">
            <LinkComponent href={`/list/${list.id}`}>
                <Heading size={2}>{list.name}</Heading>
            </LinkComponent>
            {showSpines ?
                <div className="mx-auto flex flex-row items-end">
                    {editions.map(async (edition) => 
                        <SpineCard key={edition.id} edition={edition} />
                    )
                    }
                </div> :
                <CardList>
                    {editions.map(async (edition) => 
                            <EditionCard 
                                key={edition.id} 
                                edition={edition} 
                                currentList={list}
                            />
                        )
                    }
                </CardList>
            }
        </div>
    )
}