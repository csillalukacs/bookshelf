'use client'
import Button from "@/components/Button";

export default function DeleteButton({ id }: { id: string })
{
    return (
        <Button 
            label={"Delete this list"} 
            type="text"
            disabled={false}
            onClick={()=>{}}
        />
            
    )
}