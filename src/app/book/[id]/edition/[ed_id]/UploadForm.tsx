"use client";

import { uploadImage } from "@/app/actions/actions";
import Button from "@/components/Button";
import { useActionState, useEffect, useState } from "react";

export default function UploadForm({editionId, closeSelf}: { editionId: string, closeSelf: () => void }) 
{
  const [state, formAction, isPending] = useActionState(uploadImage, null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => 
  {
    if (state?.success) 
    {
      closeSelf();
    }
  }, [state])
  
  return (
    <div>
        <form action={formAction} className="flex flex-col gap-4 ">
        <h1 className="text-2xl text-black">Upload New Cover</h1>
        <input 
            type="file"
            name="file"
            accept="image/*"
            className="file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 
            hover:file:bg-orange-100 file:cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
        />
        <input type="hidden" name="editionId" value={editionId} />

        {preview && <img src={preview} alt="Preview" width="100" />}
        <div className="flex flex-row gap-2">
            <Button disabled={isPending} onClick={()=>{}} label={"Submit"}/> 
        </div>

        {state?.imageUrl && (
            <p>
            Success!
            </p>
        )}
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
        </form>
    </div>
  );
}