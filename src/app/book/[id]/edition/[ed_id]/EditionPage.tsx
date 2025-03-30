'use client'

import { Author, Book, Edition, Language, Publisher } from "@/app/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import UploadForm from "./UploadForm";
import Image from "next/image";


export default function EditionPage( {coverUrl, edition, book, author, language, publisher}:
    {coverUrl: string, edition: Edition, book: Book, author: Author, language: Language, publisher: Publisher}) 
{
    const [uploadOpen, setUploadOpen] = useState(false);

    return <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Image src={coverUrl} alt={edition.ed_title} width={100} height={150}></Image>
                <button onClick={() => setUploadOpen(true)}>Upload New Cover</button>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl">{book.title}</h3>
                <Link href={`/author/${author.id}`}>
                    {author.name}
                </Link>
                <p>
                    Published: {edition.year_pub} by {publisher.name}
                </p>
                <p>
                    Language: {language.name}
                </p>
                <button>
                    Edit details
                </button>
                <Link href={`/book/${book.id}`}>See all editions</Link>
                {uploadOpen &&
                    <>
                        <UploadForm editionId={edition.id} close={() => setUploadOpen(false)}></UploadForm>
                    </>}
            </div>
        </div>
    </main>;
}
