'use client';

import { addEdition } from "@/app/actions/edition-actions";
import { Book, Language, Publisher } from "@/app/lib/definitions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { NumberInput } from "@/components/NumberInput";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect } from "react";

export default function NewEditionForm(
  { languages, book, publishers, closeSelf }:
    { languages: Language[], book: Book, publishers: Publisher[], closeSelf: () => void }
) 
{
  const [formState, formAction, isPending] = useActionState(addEdition, { success: false, error: '' });

  useEffect(() => 
  {
    if (formState.success) closeSelf();
  }, [formState, closeSelf])

  return (
    <>
      <Heading size={2}>Add a new Edition</Heading>
      <form action={formAction} className="flex flex-col gap-4 text-black">
        <input type="hidden" name="bookId" value={book.id} />
        <TextInput
          name="title"
          label="Title"
          disabled={isPending}
          defaultValue={book.title}
          required={true}
        />
        <div className="flex flex-row justify-between align-center">
          <SelectInput
            name="language"
            label="Language"
            list={languages}
            disabled={isPending}
            className="w-[30%]"
          />
          {/* <TextInput
            name="translator (optional)"
            label="Translator (optional)"
            disabled={isPending}
            list={authors}
            className="w-[65%]"
          /> */}
        </div>
        <div className="flex flex-row justify-between">
          <TextInput 
            name="publisher"
            label="Publisher"
            disabled={isPending}
            list={publishers}
            className="w-[65%]"
            required={true}
          />
          <NumberInput
            name="year"
            label="Publication year"
            disabled={isPending}
            className="w-[30%]"
            required={true}
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <TextInput
            name="isbn"
            label="ISBN"
            disabled={isPending}
            className="w-[70%]"
            required={true}
          />
          <NumberInput
            name="pages"
            label="Pages"
            disabled={isPending}
            className="w-[25%]"
            required={true}
            defaultValue={200}
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <NumberInput
            name="height"
            label="Height (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={198}
            required={true}
          />
          <NumberInput
            name="width"
            label="Width (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={130}
            required={true}
          />          
          <NumberInput
            name="thickness"
            label="Thickness (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={20}
            required={true}
          />
        </div>
        <Button disabled={isPending} label="Submit" />
        { !formState.success && <p className="Error"> {formState.error} </p> }
      </form>
    </>
  );
}