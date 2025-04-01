'use client';

import { addList } from "@/app/actions";
import Button from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import { useActionState } from "react";

export default function NewListForm({userId} : {userId: string}) 
{
  const [formState, formAction, isPending] = useActionState(addList, { status: '' });

  return (
    <>
      <h2>Create a new list</h2>

      <form action={formAction} className="flex flex-col gap-4 text-black">
        <input type="hidden" name="userId" value={userId} />

        <TextInput
          name="name"
          disabled={isPending}
        />
        <Button disabled={isPending} label="Submit" />
        {formState.status === 'error' &&
          <p className="Error">
            An error occurred.
          </p>
        }
        {formState.status === 'success' && formState.list &&
          <p className="Error">
            Successfully created{" "}
            <Link href={`/list/${formState.list.id}`}>{formState.list.name}</Link>
            !
          </p>
        }
      </form>
    </>
  );
}