'use client'

import Button from "./Button";
import { useState } from "react";
import { Author, Book, Language, Publisher } from "@/app/lib/definitions";
import NewEditionForm from "@/app/book/[id]/edition/new/NewEditionForm";
import ClosableDialog from "./ClosableDialog";

export default function AddEdition(
    { authors, languages, publishers, book }: 
    { authors: Author[], languages: Language[], publishers: Publisher[], book: Book }
)
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add another edition" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >
                <NewEditionForm 
                    authors={authors} 
                    languages={languages} 
                    publishers={publishers} 
                    book={book}
                    isDialog={true} 
                    closeSelf={() => setOpen(false)} 
                />
        </ClosableDialog>
    </>
    )
}