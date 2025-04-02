'use client'
import { addAuthor } from "@/app/actions/author-actions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect } from "react";

export default function Form({isDialog = false, closeSelf}: {isDialog?: boolean, closeSelf?: () => void})
{
    const [formState, formAction, isPending] = useActionState(addAuthor, {success: false, error: ''});

    useEffect(() => 
    {
      if (isDialog && closeSelf && formState?.success) 
      {
        closeSelf();
      }
    }, [formState])

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
          {!formState.success &&
            <p className="Error">
              {formState.error}
            </p>
          }
          {formState.success &&
            <p>
              Successfully added{" "}
                <LinkComponent href={`/author/${formState.value.id}`}>{formState.value.name}</LinkComponent> 
              !
            </p>
          }
        </form>
      </>
    );
}