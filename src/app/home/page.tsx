import Heading from "@/components/Heading";

export default async function Home() 
{
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-full">
      <div className="w-fit">
        <Heading className="typewriter font-[family-name:var(--font-geist-mono)" size={6}>What's on your shelf?</Heading>
      </div>
    </div>
  );
}
