'use client';

import { addBook } from "@/app/actions";
import { Author, Language } from "@/app/lib/definitions";
import Button from "@/components/Button";
import { NumberInput } from "@/components/NumberInput";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import { useActionState } from "react";

export default function NewBookForm(
    {authors, languages}: {authors: Author[], languages: Language[]}
)
{
    const [formState, formAction, isPending] = useActionState(addBook, {status: ''});

    return (
      <>
        <h2>Add a new book</h2>
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
          {formState.status === 'error' &&
            <p className="Error">
              An error occurred.
            </p>
          }
          {formState.status === 'success' && formState.book &&
            <p className="Error">
              Successfully added{" "}
                <Link href={`/book/${formState.book.id}`}>{formState.book.title}</Link> 
              !
            </p>
          }
        </form>
      </>
    );
  }