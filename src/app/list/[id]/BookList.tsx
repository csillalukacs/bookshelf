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
        <div className="flex flex-col w-full">
            <LinkComponent href={`/list/${list.id}`}>
                <Heading size={2}>{list.name}</Heading>
            </LinkComponent>
            {showSpines ?
                <div className="flex flex-col w-full p-2 pt-16 border-gray-900 shadow-md rounded-lg border-b-20 pb-0 bg-gray-100" >
                    <div className="flex flex-row items-end ml-4">
                        {editions.map(async (edition) => 
                            <SpineCard key={edition.id} edition={edition} />
                        )
                        }
                    </div>
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