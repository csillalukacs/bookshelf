'use client'

import { Edition } from "@/app/lib/definitions";
import { useState } from "react";
import UploadForm from "./UploadForm";
import Button from "@/components/Button";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function UploadImage({ edition, type }:
    { edition: Edition, type: "cover" | "spine"})
{
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button label={`Upload New ${type==="cover" ? "Cover" : "Spine"}`} onClick={() => setOpen(true)} disabled={false} />
            
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
                  <UploadForm edition={edition} type={type} closeSelf={() => setOpen(false)}></UploadForm>
                </DialogContent>
            </Dialog>
        </>
    )
}
