import Heading from "@/components/Heading";

export default async function Home() 
{
  return (
    <div >
      <div className="flex flex-col gap-[24px] items-center justify-start">
        <Heading size={4}>What's on your shelf?</Heading>
        <img src="/bookshelf.svg"></img>
      </div>
    </div>
  );
}
