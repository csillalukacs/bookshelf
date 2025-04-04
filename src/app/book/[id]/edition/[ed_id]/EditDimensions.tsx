'use client'
import { updateDimensions } from "@/app/actions/edition-actions";
import { Edition } from "@/app/lib/definitions";
import Button from "@/components/Button";
import ClosableDialog from "@/components/ClosableDialog";
import { NumberInput } from "@/components/NumberInput";
import { useActionState, useEffect, useState } from "react";

export default function EditAuthor({edition}: {edition: Edition})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(updateDimensions, {success: false, error: ''});

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
            edit dimensions
        </button>
        <ClosableDialog open={open} setOpen={setOpen} >
            <form action={formAction} className="flex flex-col gap-4 text-black">
                <NumberInput name="height" label="Height (mm)" disabled={false} required={true} defaultValue={edition.height} />
                <NumberInput name="width" label="Width (mm)" disabled={false} required={true} defaultValue={edition.width} />
                <NumberInput name="thickness" label="Thickness (mm)" disabled={false} required={true} defaultValue={edition.thickness} />
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
