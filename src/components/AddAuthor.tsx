'use client'

import Button from "./Button";
import { useState } from "react";
import NewAuthorForm from "@/app/author/new/NewAuthorForm";
import ClosableDialog from "./ClosableDialog";

export default function AddAuthor() 
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Add author" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >       
                <NewAuthorForm isDialog={true} closeSelf={() => setOpen(false)} />
        </ClosableDialog>
    </>
    )
}