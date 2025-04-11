'use client'

import { deleteAuthor } from "@/app/actions/author-actions"
import Button from "@/components/Button"


export default function DeleteButton({ id }: { id: string })
{
    return (
        <Button 
            label={"Delete this author"} 
            type="text"
            disabled={false}
            red={true}
            onClick={()=>{deleteAuthor(id)}}
        />
    )
}