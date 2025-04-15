'use client'
import { updatePublisher } from "@/app/actions/edition-actions";
import { Edition, Publisher } from "@/app/lib/definitions";
import Button from "@/components/Button";
import ClosableDialog from "@/components/ClosableDialog";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect, useState } from "react";

export default function EditAuthor({edition, publishers}: {edition: Edition, publishers: Publisher[]})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(updatePublisher, {success: false, error: ''});

    useEffect(() => 
    {
        if (formState?.success) setOpen(false);
    }, [formState])

    return (<>
        <button 
            disabled={false} 
            onClick={() => setOpen(true)}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
        > 
            edit publisher 
        </button>
        <ClosableDialog open={open} setOpen={setOpen} >
            <form action={formAction} className="flex flex-col gap-4 text-black">
                <TextInput name="name" label="Name" disabled={false} list={publishers} required={true} />
                <input type="hidden" name="editionId" value={edition.id} />
                <input type="hidden" name="bookId" value={edition.book_id} />
                <Button label="Submit" disabled={isPending} />
                {!formState.success &&
                    <p className="Error"> {formState.error} </p>
                }
            </form>
        </ClosableDialog>
    </>
    )
}