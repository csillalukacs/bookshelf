'use client'
import { updateBookLanguage } from "@/app/actions/book-actions";
import { Book, Language } from "@/app/lib/definitions";
import Button from "@/components/Button";
import ClosableDialog from "@/components/ClosableDialog";
import { SelectInput } from "@/components/SelectInput";
import { useActionState, useEffect, useState } from "react";

export default function EditLanguage({book, languages}: {book: Book, languages: Language[]})
{
    const [open, setOpen] = useState(false);
    const [formState, formAction, isPending] = useActionState(updateBookLanguage, {success: false, error: ''});

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
                <SelectInput 
                    name="language"   
                    label="Language" 
                    disabled={false} 
                    list={languages} 
                    defaultValue={book.orig_lang_id}
                    required={true}
                />
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