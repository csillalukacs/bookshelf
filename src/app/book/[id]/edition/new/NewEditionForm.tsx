'use client';

import { addEdition } from "@/app/actions/actions";
import { Author, Book, Language, Publisher } from "@/app/lib/definitions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import { NumberInput } from "@/components/NumberInput";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect } from "react";

export default function NewEditionForm(
  { authors, languages, book, publishers, isDialog = false, closeSelf }:
    { authors: Author[], languages: Language[], book: Book, publishers: Publisher[], isDialog?: boolean, closeSelf?: () => void }
) 
{
  const [formState, formAction, isPending] = useActionState(addEdition, { success: false, error: '' });

  useEffect(() => 
  {
    if (isDialog && closeSelf && formState?.success) 
    {
      closeSelf();
    }
  }, [formState])

  return (
    <>
      <Heading size={2}>Add a new Edition</Heading>
      <form action={formAction} className="flex flex-col gap-4 text-black">
        <input type="hidden" name="bookId" value={book.id} />

        <TextInput
          name="title"
          disabled={isPending}
          defaultValue={book.title}
          required={true}
        />
        <div className="flex flex-row justify-between align-center">
          <SelectInput
            name="language"
            label="language"
            list={languages}
            disabled={isPending}
            className="w-[30%]"
          />
          <TextInput
            name="translator (optional)"
            disabled={isPending}
            list={authors}
            className="w-[65%]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <TextInput 
            name="publisher"
            disabled={isPending}
            list={publishers}
            className="w-[65%]"
            required={true}
          />
          <NumberInput
            name="year"
            label="publication year"
            disabled={isPending}
            className="w-[30%]"
            required={true}
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <TextInput
            name="isbn"
            label="isbn"
            disabled={isPending}
            className="w-[70%]"
            required={true}
          />
          <NumberInput
            name="pages"
            label="pages"
            disabled={isPending}
            className="w-[25%]"
            required={true}
            defaultValue={200}
          />
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <NumberInput
            name="height"
            label="height (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={198}
            required={true}
          />
          <NumberInput
            name="width"
            label="width (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={130}
            required={true}
          />          
          <NumberInput
            name="thickness"
            label="thickness (mm)"
            disabled={isPending}
            className="w-[100px]"
            defaultValue={20}
            required={true}
          />
        </div>
        <Button disabled={isPending} label="Submit" />
        {!formState.success &&
          <p className="Error">
            {formState.error}
          </p>
        }
        {formState.success && 
          <p className="Error">
            Successfully added{" "}
            <LinkComponent href={`/book/${book.id}/edition/${formState.value.id}`}>{formState.value.ed_title}</LinkComponent>
            !
          </p>
        }
      </form>
    </>
  );
}