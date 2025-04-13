'use client';

import { addList } from "@/app/actions/list-actions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect } from "react";

export default function NewListForm({userId, closeSelf}: {userId: string, closeSelf: () => void})
{
  const [formState, formAction, isPending] = useActionState(addList, {success: false, error: '' });

  useEffect(() => 
  {
    if (formState.success) 
    {
      closeSelf();
    }
  }, [formState, closeSelf])

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
            {formState.error}
          </p>
        }
      </form>
    </>
  );
}