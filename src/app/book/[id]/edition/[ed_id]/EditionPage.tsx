'use client'

import { Author, Book, Edition, Language, Publisher } from "@/app/lib/definitions";
import { useState } from "react";
import UploadForm from "./UploadForm";
import Image from "next/image";
import Button from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import Heading from "@/components/Heading";


export default function EditionPage( {coverUrl, edition, book, author, language, publisher}:
    {coverUrl: string, edition: Edition, book: Book, author: Author, language: Language, publisher: Publisher}) 
{
    const [uploadOpen, setUploadOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <Image 
                    src={coverUrl} 
                    alt={edition.ed_title} 
                    width={150} 
                    height={200}
                />
                <Button label="Upload New Cover" onClick={() => setUploadOpen(true)} disabled={false}/>
            </div>
            <div className="flex flex-col gap-4">
                <Heading size={2}>{book.title}</Heading>
                <LinkComponent href={`/author/${author.id}`}>
                    {author.name}
                </LinkComponent>
                <p>
                    Published: {edition.year_pub} by {publisher.name}
                </p>
                <p>
                    Language: {language.name}
                </p>
                <button>
                    Edit details
                </button>
                <LinkComponent href={`/book/${book.id}`}>See all editions</LinkComponent>
                {uploadOpen &&
                    <>
                        <UploadForm editionId={edition.id} close={() => setUploadOpen(false)}></UploadForm>
                    </>}
            </div>
        </div>
    )
}
