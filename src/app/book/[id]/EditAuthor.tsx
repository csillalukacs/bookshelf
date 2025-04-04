'use client'
import { updateBookAuthor } from "@/app/actions/book-actions";
import { Author, Book } from "@/app/lib/definitions";
import Button from "@/components/Button";
import ClosableDialog from "@/components/ClosableDialog";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect, useState } from "react";

export default function EditAuthor({book, authors}: {book: Book, authors: Author[]})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(updateBookAuthor, {success: false, error: ''});

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
            edit author 
        </button>
        <ClosableDialog open={open} setOpen={setOpen} >
            <form action={formAction} className="flex flex-col gap-4 text-black">
                <TextInput name="name" label="Name" disabled={false} list={authors} />
                <input type="hidden" name="bookId" value={book.id} />
                <Button label="Submit" disabled={isPending} />
                {!formState.success &&
                    <p className="Error"> {formState.error} </p>
                }
            </form>
        </ClosableDialog>
    </>
    )
}