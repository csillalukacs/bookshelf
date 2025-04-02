'use client'

import { Dialog, DialogContent, IconButton } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import NewAuthorForm from "@/app/author/new/NewAuthorForm";

export default function AddAuthor() 
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add author" disabled={false} onClick={() => setOpen(true)} />
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
                <NewAuthorForm isDialog={true} closeSelf={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    </>
    )
}