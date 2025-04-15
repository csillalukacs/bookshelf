import { fetchPublishers } from "@/app/lib/data";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";
import { Metadata } from "next";

export const metadata: Metadata = 
{
    title: 'Publishers',
};

//this page is currently not used (nothing links to it)
export default async function Page() 
{
  const publishers = await fetchPublishers();

  return (
    <>
      <Heading size={3}>Authors</Heading>
      <ul className="self-start">
          {publishers.map(publisher=>
            <li key={publisher.id}>
              <LinkComponent href={`/publisher/${publisher.id}`}>
                {publisher.name}
              </LinkComponent>
            </li>
          )}
      </ul>
    </>
  )
}