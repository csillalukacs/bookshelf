'use client'

import { deleteAuthor } from "@/app/actions"


export default function DeleteButton({ id }: { id: string })
{
    return (
        <button 
            className="text-red-400 cursor-pointer mr-2"
            onClick={()=>{deleteAuthor(id)}}
        >
            x
        </button>
    )
}