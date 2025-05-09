'use client'

import Button from "@/components/Button";
import { useState } from "react";
import { Book, Language, Publisher } from "@/app/lib/definitions";
import NewEditionForm from "@/app/book/[id]/NewEditionForm";
import ClosableDialog from "@/components/ClosableDialog";

export default function AddEdition(
    { languages, publishers, book }: 
    { languages: Language[], publishers: Publisher[], book: Book }
)
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add edition" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >
                <NewEditionForm 
                    languages={languages} 
                    publishers={publishers} 
                    book={book}
                    closeSelf={() => setOpen(false)} 
                />
        </ClosableDialog>
    </>
    )
}