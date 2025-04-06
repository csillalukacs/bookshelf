
'use client'
import Button from "@/components/Button";
import { useActionState, useEffect, useState } from "react";
import ClosableDialog from "@/components/ClosableDialog";
import { TextInput } from "@/components/TextInput";
import { editUsername } from "../actions/user-actions";

export default function EditUsername({userId} : {userId: string})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(editUsername, {success: false, error: ''});

    useEffect(() =>
    {
        if (formState?.success) setOpen(false);
    }, [formState])

    return (<>
        <Button label="edit" type="text" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >       
                <form action={formAction} className="flex flex-col gap-4 text-black">
                    <input type="hidden" name="userId" value={userId} />
                    <TextInput name="username" label="Username" disabled={isPending} />
                    <Button label="Submit" disabled={isPending} />
                    {!formState.success &&
                        <p className="Error"> {formState.error} </p>
                    }
                </form>
        </ClosableDialog>
    </>
    )
}