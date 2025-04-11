import { fetchUserById } from "@/app/lib/data";
import Bookshelf from "@/app/profile/[id]/Bookshelf";
import CardList from "@/components/CardList";
import EditionCard from "@/components/EditionCard";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import SpineCard from "@/components/SpineCard";
import ViewSwitcher from "./ViewSwitcher";
import { Edition, List, View } from "@/app/lib/definitions";

export default async function BookList(
    {list, editions, view, allowViewSwitch} : 
    { list: List, editions: Edition[], view: View, allowViewSwitch: boolean}
)
{
    const user = await fetchUserById(list.user_id);
    const username = user?.username;

    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex flex-row justify-between items-center">
                <LinkComponent href={`/list/${list.id}`}>
                    <Heading size={2}>{list.name}</Heading>
                </LinkComponent>
                {allowViewSwitch && <ViewSwitcher view={"cover"}/>}
            </div>
            {username && <p>by: <LinkComponent href={`/profile/${list.user_id}`}>{username}</LinkComponent></p>}
            { view === "spine" &&
                <div className="flex flex-col w-full p-2 pt-16 border-gray-900 shadow-md rounded-lg border-b-20 pb-0 bg-gray-100" >
                    <div className="flex flex-row items-end ml-4">
                        { editions.map(async (edition) => 
                            <SpineCard key={edition.id} edition={edition} />
                        )
                        }
                    </div>
                </div> 
            }
            { view === "cover" &&
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
            { view === "3d" &&
                <Bookshelf list={editions}/>
            }
        </div>
    )
}