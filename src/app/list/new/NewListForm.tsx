'use client';

import { addList } from "@/app/actions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import { TextInput } from "@/components/TextInput";
import { useActionState } from "react";

export default function NewListForm({userId} : {userId: string}) 
{
  const [formState, formAction, isPending] = useActionState(addList, {success: false, error: '' });

  return (
    <>
      <Heading size={2}>Create a new list</Heading>

      <form action={formAction} className="flex flex-col gap-4 text-black">
        <input type="hidden" name="userId" value={userId} />

        <TextInput
          name="name"
          disabled={isPending}
        />
        <Button disabled={isPending} label="Submit" />
        {!formState.success &&
          <p className="Error">
            An error occurred.
          </p>
        }
        {formState.success &&
          <p className="Error">
            Successfully created{" "}
            <LinkComponent href={`/list/${formState.value.id}`}>{formState.value.name}</LinkComponent>
            !
          </p>
        }
      </form>
    </>
  );
}