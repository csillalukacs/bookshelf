'use client'

import Button from "@/components/Button";
import { useState } from "react";
import NewAuthorForm from "@/app/author/list/NewAuthorForm";
import ClosableDialog from "@/components/ClosableDialog";

export default function AddAuthor() 
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add author" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >       
                <NewAuthorForm closeSelf={() => setOpen(false)} />
        </ClosableDialog>
    </>
    )
}