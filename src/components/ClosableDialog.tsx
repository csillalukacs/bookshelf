'use client'

import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function ClosableDialog(
    {children, open, setOpen}: 
    {children: React.ReactNode, open: boolean, setOpen: (o:boolean)=>void})
{
    return (<>
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
                {children}
            </DialogContent>
        </Dialog>
    </>
    )
}