'use client'

import { deleteBook } from "@/app/actions";
import { Book } from "@/app/lib/definitions";
import Button from "@/components/Button";

export function DeleteBookButton({book} : {book: Book}) 
{
    return <Button label={"Delete this book"} onClick={() => deleteBook(book.id)} disabled={false} />;
}
