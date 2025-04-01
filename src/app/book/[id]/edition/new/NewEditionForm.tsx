'use client';

import { addEdition } from "@/app/actions";
import { Author, Book, Language, Publisher } from "@/app/lib/definitions";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import LinkComponent from "@/components/LinkComponent";
import { NumberInput } from "@/components/NumberInput";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useActionState } from "react";

export default function NewEditionForm(
  { authors, languages, book, publishers }:
    { authors: Author[], languages: Language[], book: Book, publishers: Publisher[] }
) 
{
  const [formState, formAction, isPending] = useActionState(addEdition, { success: false, error: '' });

  return (
    <>
      <Heading size={2}>Add a new Edition</Heading>
      <p>
        Fill out this form to add a new Edition to the database.
      </p>
      <form action={formAction} className="flex flex-col gap-4 text-black">
        <input type="hidden" name="bookId" value={book.id} />

        <TextInput
          name="title"
          disabled={isPending}
        />
        <TextInput
          name="translator (optional)"
          disabled={isPending}
          list={authors}
        />
        <TextInput 
          name="publisher"
          disabled={isPending}
          list={publishers}
        />
        <NumberInput
          name="year"
          label="publication year"
          disabled={isPending}
        />
        <SelectInput
          name="language"
          label="language"
          list={languages}
          disabled={isPending}
        />
        <TextInput
          name="isbn"
          label="isbn"
          disabled={isPending}
        />
        <Button disabled={isPending} label="Submit" />
        {!formState.success &&
          <p className="Error">
            An error occurred.
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