import { Edition, List } from "@/app/lib/definitions"
import ListSelectionForm from "./ListSelectionForm"
import ClosableDialog from "./ClosableDialog"

export default function ListSelectionDialog(
    { open, setOpen, lists, edition }:
        { open: boolean, setOpen: (o: boolean) => void, lists: List[], edition: Edition }) 
{
    return (
        <ClosableDialog open={open} setOpen={setOpen} >
            <ListSelectionForm edition={edition} lists={lists} closeSelf={() => setOpen(false)} />
        </ClosableDialog>
    )
}