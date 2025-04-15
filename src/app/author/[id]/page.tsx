import { auth } from "@/app/auth";
import { fetchAuthorById, fetchBooksByAuthorId } from "@/app/lib/data";
import BookCard from "@/components/BookCard";
import CardList from "@/components/CardList";
import Heading from "@/components/Heading";
import DeleteAuthor from "./DeleteAuthor";
import { Metadata } from "next";
import { Props } from "@/app/lib/definitions";
   
export async function generateMetadata({ params }: Props ): Promise<Metadata> 
{
    const { id } = await params
    const author = await fetchAuthorById(id);

    return { title: author?.name}
}

export default async function Page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const author = await fetchAuthorById(id);
    const books = await fetchBooksByAuthorId(id);
    const session = await auth();

    return (
        <div>
            <Heading size={2}>{author.name}</Heading>
            {!books.length && session?.user && <DeleteAuthor id={author.id} />}
            <CardList>
                {books.map(book => <BookCard key={book.id} book={book} /> )}
            </CardList>
        </div>
    )
}