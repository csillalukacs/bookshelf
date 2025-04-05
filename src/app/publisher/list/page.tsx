import { fetchPublishers } from "@/app/lib/data";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";

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