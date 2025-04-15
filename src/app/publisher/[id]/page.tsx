import { fetchEditionsByPublisherId } from "@/app/actions/edition-actions";
import { fetchPublisherById } from "@/app/lib/data";
import CardList from "@/components/CardList";
import EditionCard from "@/components/EditionCard";
import Heading from "@/components/Heading";
import { Metadata } from "next";
import { Props } from "@/app/lib/definitions";
   
export async function generateMetadata({ params }: Props ): Promise<Metadata> 
{
    const { id } = await params;
    
    // ok so my guess is that next does some clever caching thing which means that it's
    // actually fine to make the same requests in generateMetadata and the component itself 
    // if not then ¯\_(ツ)_/¯ we'll worry about it later
    const publisher = await fetchPublisherById(id);

    return { title: publisher.name};
}

export default async function Page({ params }: Props ) 
{
    const { id } = await params;
    const author = await fetchPublisherById(id);
    const editions = await fetchEditionsByPublisherId(id);

    return (
        <div>
            <Heading size={2}>{author.name}</Heading>
            <CardList>
                {editions.map(edition => <EditionCard key={edition.id} edition={edition} /> )}
            </CardList>
        </div>
    )
}