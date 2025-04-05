'use client';

import { addBook } from "@/app/actions/book-actions";
import { Author, Language } from "@/app/lib/definitions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import { NumberInput } from "@/components/NumberInput";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useActionState, useEffect } from "react";

export default function NewBookForm(
    {authors, languages, closeSelf}: 
    {authors: Author[], languages: Language[], closeSelf: () => void}
)
{
    const [formState, formAction, isPending] = useActionState(addBook, {success: false, error: ''});

    useEffect(() => 
    {
      if (formState.success) 
      {
        closeSelf();
      }
    }, [formState])

    return (
      <>
        <Heading size={2}>Add a new book</Heading>
        <form action={formAction} className="flex flex-col gap-4 text-black">
          <TextInput
            name="title"
            label="Title"
            disabled={isPending}
          />
          <TextInput 
            name="author"
            label="Author"
            disabled={isPending}
            list={authors}
          />
          <div className="flex flex-row gap-2 justify-between">
            <NumberInput
                name="year"
                label="First published"
                disabled={isPending}
            />
            <SelectInput
                name="language"
                label="Original language"
                list={languages}
                disabled={isPending}
            />
          </div>  
          <Button label="Submit" disabled={isPending} />
          {!formState.success  &&
            <p className="Error">
              {formState.error}
            </p>
          }
        </form>
      </>
    );
  }