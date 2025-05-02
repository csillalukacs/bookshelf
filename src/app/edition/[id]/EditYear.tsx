'use client'
import { updateEditionYear } from "@/app/actions/edition-actions";
import { Edition } from "@/app/lib/definitions";
import Button from "@/components/Button";
import ClosableDialog from "@/components/ClosableDialog";
import { NumberInput } from "@/components/NumberInput";
import { useActionState, useEffect, useState } from "react";

export default function EditYear({edition}: {edition: Edition})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(updateEditionYear, {success: false, error: ''});

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
            edit 
        </button>
        <ClosableDialog open={open} setOpen={setOpen} >
            <form action={formAction} className="flex flex-col gap-4 text-black">
                <NumberInput name="year" label="Year" disabled={false} required={true} defaultValue={edition.first_pub} />
                <input type="hidden" name="bookId" value={edition.id} />
                <Button label="Submit" disabled={isPending} />
                {!formState.success &&
                    <p className="Error"> {formState.error} </p>
                }
            </form>
        </ClosableDialog>
    </>
    )
}