'use client'

import NewBookForm from "@/app/book/list/NewBookForm";
import Button from "@/components/Button";
import { useState } from "react";
import { Author, Language } from "@/app/lib/definitions";
import ClosableDialog from "@/components/ClosableDialog";

export default function AddABook({ authors, languages }: { authors: Author[], languages: Language[] }) 
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add a book" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >
            <NewBookForm authors={authors} languages={languages} closeSelf={() => setOpen(false)} />
        </ClosableDialog>
    </>
    )
}