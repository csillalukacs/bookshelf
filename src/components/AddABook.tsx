'use client'

import { Dialog, DialogContent, IconButton } from "@mui/material";
import NewBookForm from "@/app/book/new/NewBookForm";
import Button from "./Button";
import { useState } from "react";
import { Author, Language } from "@/app/lib/definitions";
import CloseIcon from '@mui/icons-material/Close';

export default function AddABook({ authors, languages }: { authors: Author[], languages: Language[] }) {
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add a book" disabled={false} onClick={() => setOpen(true)} />
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
                <NewBookForm authors={authors} languages={languages} isDialog={true} closeSelf={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    </>
    )
}