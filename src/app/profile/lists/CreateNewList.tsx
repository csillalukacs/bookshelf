'use client'

import Button from "@/components/Button";
import { useState } from "react";
import ClosableDialog from "@/components/ClosableDialog";
import NewListForm from "@/app/profile/lists/NewListForm";

export default function CreateList({userId} : {userId: string})
{
    const [open, setOpen] = useState(false);

    return (<>
        <Button label="Create list" disabled={false} onClick={() => setOpen(true)} />
        <ClosableDialog open={open} setOpen={setOpen} >       
                <NewListForm userId={userId} closeSelf={() => setOpen(false)} />
        </ClosableDialog>
    </>
    )
}