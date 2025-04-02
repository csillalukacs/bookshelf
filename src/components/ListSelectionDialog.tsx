import { Edition, List } from "@/app/lib/definitions"
import { Dialog, DialogContent, IconButton } from "@mui/material"
import ListSelectionForm from "./ListSelectionForm"
import CloseIcon from '@mui/icons-material/Close'

export default function ListSelectionDialog(
    { open, setOpen, lists, edition }:
        { open: boolean, setOpen: (o: boolean) => void, lists: List[], edition: Edition }) 
{
    return (
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
                <ListSelectionForm edition={edition} lists={lists} closeSelf={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}