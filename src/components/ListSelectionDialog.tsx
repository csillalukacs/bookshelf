"use client";

import { addEditionToList } from "@/app/actions/list-actions";
import Button from "@/components/Button";
import { useActionState } from "react";
import Heading from "./Heading";
import { SelectInput } from "./SelectInput";
import { Edition, List } from "@/app/lib/definitions";

export default function ListSelectionDialog(
    { close, list, edition }:
        { close: () => void, list: List[], edition: Edition }) 
{
    const [state, formAction, isPending] = useActionState(addEditionToList, { success: true });

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/35 z-50">
            <form action={formAction} className="bg-white bg-opacity-100 p-4 rounded shadow-md flex flex-col gap-4 z-51">
                <Heading size={2}>Add to list</Heading>
                <SelectInput list={list} label="List" disabled={isPending} name={"list"} />
                <input type="hidden" name="editionId" value={edition.id} />

                <div className="flex flex-row gap-2">
                    <Button disabled={isPending} onClick={() => { }} label={"Submit"} />
                    <button onClick={close}>Close</button>
                </div>
            </form>
        </div>
    );
}