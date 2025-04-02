'use client'
import { Edition, List } from "@/app/lib/definitions";
import { useState } from "react";
import Button from "./Button";
import ListSelectionDialog from "./ListSelectionDialog";


export default function AddToList({edition, lists}: {edition: Edition, lists: List[]})
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add to list" disabled={false} onClick={() => setOpen(true)} />
        <ListSelectionDialog open={open} setOpen={setOpen} lists={lists} edition={edition} />
    </>
    )
}