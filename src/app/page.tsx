import SignIn from "@/components/sign-in"

export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div>
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by signing in with google
            </li>
            <li className="tracking-[-.01em]">
              Add the books you own to your bookshelf
            </li>
          </ol>
          <div className="m-4">
            <SignIn/>
          </div>
        </div>
    </div>
  );
}
