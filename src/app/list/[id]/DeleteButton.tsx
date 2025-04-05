'use client'
import { deleteList } from "@/app/actions/list-actions";
import Button from "@/components/Button";

export default function DeleteButton({ id }: { id: string })
{
    return (
        <Button 
            label={"Delete this list"} 
            type="text"
            disabled={false}
            red={true}
            onClick={()=>{deleteList(id)}}
        />
            
    )
}