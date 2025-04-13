"use client";

import { addEditionToList } from "@/app/actions/list-actions";
import Button from "@/components/Button";
import { useActionState, useEffect } from "react";
import Heading from "./Heading";
import { SelectInput } from "./SelectInput";
import { Edition, List } from "@/app/lib/definitions";

export default function ListSelectionForm(
    { closeSelf, lists, edition }:
        { closeSelf: () => void, lists: List[], edition: Edition }) 
{
    const [formState, formAction, isPending] = useActionState(addEditionToList, { success: false, error: '' });

    useEffect(() => 
    {
      if (formState?.success) 
      {
        closeSelf();
      }
    }, [formState, closeSelf])

    return (
        <div className="">
            <form action={formAction} className="rounded flex flex-col gap-4">
                <Heading size={2}>Add to list</Heading>
                <SelectInput list={lists} label="List" disabled={isPending} name={"list"} />
                <input type="hidden" name="editionId" value={edition.id} />

                <div className="flex flex-row gap-2">
                    <Button disabled={isPending} onClick={() => { }} label={"Submit"} />
                </div>
                {!formState.success &&
                    <p className="Error">
                        {formState.error}
                    </p>
                }
            </form>
        </div>
    );
}