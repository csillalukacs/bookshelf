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
    {authors, languages, isDialog = false, closeSelf}: 
    {authors: Author[], languages: Language[], isDialog?: boolean, closeSelf?: () => void}
)
{
    const [formState, formAction, isPending] = useActionState(addBook, {success: false, error: ''});

    useEffect(() => 
    {
      if (isDialog && closeSelf && formState?.success) 
      {
        closeSelf();
      }
    }, [formState])

    return (
      <>
        <Heading size={2}>Add a new book</Heading>
        <p>
          Fill out this form to add a new book to the database.
        </p>
        <form action={formAction} className="flex flex-col gap-4 text-black">
          <TextInput
            name="title"
            disabled={isPending}
          />
          <TextInput 
            name="author"
            disabled={isPending}
            list={authors}
          />
            <NumberInput
                name="year"
                label="first published"
                disabled={isPending}
            />
            <SelectInput
                name="language"
                label="original language"
                list={languages}
                disabled={isPending}
            />
          <Button label="Submit" disabled={isPending} />
          {!formState.success  &&
            <p className="Error">
              {formState.error}
            </p>
          }
          {formState.success &&
            <p>
              Successfully added{" "}
                <LinkComponent href={`/book/${formState.value.id}`}>{formState.value.title}</LinkComponent> 
              !
            </p>
          }
        </form>
      </>
    );
  }