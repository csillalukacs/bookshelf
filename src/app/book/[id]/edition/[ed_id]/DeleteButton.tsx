'use client'

import { deleteEdition } from "@/app/actions/edition-actions"
import Button from "@/components/Button"

export default function DeleteButton({ id, bookId }: { id: string, bookId: string })
{
    return (
        <Button 
            label={"Delete this edition"} 
            type="text"
            disabled={false}
            onClick={()=>{deleteEdition(id, bookId)}}
            red={true}
        />
    )
}