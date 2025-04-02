"use client";

import { uploadImage } from "@/app/actions/actions";
import { Edition } from "@/app/lib/definitions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useActionState, useEffect, useState } from "react";

export default function UploadForm(
  { edition, type, closeSelf}: 
  { edition: Edition, type: "cover" | "spine", closeSelf: () => void }
)
{
  const [formState, formAction, isPending] = useActionState(uploadImage, { success: false, error: '' });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => 
  {
    if (formState?.success) 
    {
      closeSelf();
    }
  }, [formState])
  
  return (
    <div>
        <form action={formAction} className="flex flex-col gap-4 ">
        <Heading size={2}>Upload New {type==="cover" ? "Cover" : "Spine"}</Heading>
        <input 
            type="file"
            name="file"
            accept="image/*"
            className="file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 
            file:cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
        />
        <input type="hidden" name="editionId" value={edition.id} />
        <input type="hidden" name="bookId" value={edition.book_id} />
        <input type="hidden" name="type" value={type} />

        {preview && <img src={preview} alt="Preview" width="100" />}
        <div className="flex flex-row gap-2">
            <Button disabled={isPending} onClick={()=>{}} label={"Submit"}/> 
        </div>

        {formState.success && <p> Success!</p>}

        {!formState.success && <p style={{ color: "red" }}>{formState.error}</p>}
        </form>
    </div>
  );
}