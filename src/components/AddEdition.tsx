'use client'

import { Dialog, DialogContent, IconButton } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import { Author, Book, Language, Publisher } from "@/app/lib/definitions";
import CloseIcon from '@mui/icons-material/Close';
import NewEditionForm from "@/app/book/[id]/edition/new/NewEditionForm";

export default function AddEdition(
    { authors, languages, publishers, book }: 
    { authors: Author[], languages: Language[], publishers: Publisher[], book: Book }
)
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add another edition" disabled={false} onClick={() => setOpen(true)} />
        <Dialog open={open} onClose={() => setOpen(false)} >
            <IconButton
                aria-label="close"
                onClick={() => { setOpen(false) }}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <NewEditionForm 
                    authors={authors} 
                    languages={languages} 
                    publishers={publishers} 
                    book={book}
                    isDialog={true} 
                    closeSelf={() => setOpen(false)} 
                />
            </DialogContent>
        </Dialog>
    </>
    )
}