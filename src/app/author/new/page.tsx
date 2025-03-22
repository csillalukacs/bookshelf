'use client'

import { useActionState } from "react";
import { addAuthor } from "@/app/actions";
import Link from "next/link";

export default function Page() {

  return (
    <Form></Form>
  )
}

function Form() {
    const [formState, formAction, isPending] = useActionState(addAuthor, {status: ''});
    console.log(formState);

    return (
      <>
        <h2>Add a new author</h2>
        <p>
          To add a new author to the database, enter their name here.
        </p>
        <form action={formAction}>
          <textarea
            name="name"
            disabled={isPending}
            className="bg-white text-black"
          />
          <br />
          <button 
            disabled={isPending} 
            className={!isPending ? 
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
            : "bg-blue-500 text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed"}
            >
                Submit
          </button>
          {formState.status === 'error' &&
            <p className="Error">
              An error occurred.
            </p>
          }
          {formState.status === 'success' && formState.author &&
            <p className="Error">
              Successfully added{" "}
                <Link href={`/author/${formState.author.id}`}>{formState.author.name}</Link> 
              !
            </p>
          }
        </form>
      </>
    );
  }
  
