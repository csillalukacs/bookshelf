'use client'
import { addAuthor } from "@/app/actions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import { useActionState } from "react";

export default function Form() 
{
    const [formState, formAction, isPending] = useActionState(addAuthor, {status: ''});

    return (
      <>
        <Heading size={2}>Add a new author</Heading>
        <p>
          To add a new author to the database, enter their name here.
        </p>
        <form action={formAction} className="flex flex-col gap-4 text-black">
          <TextInput 
            required={true}
            name="name"
            disabled={isPending}
          />
          <Button label="Submit" disabled={isPending} />
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