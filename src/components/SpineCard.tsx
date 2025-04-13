import { getSpineUrl } from "@/app/lib/utils";
import  Image from "next/image";
import { Edition } from "@/app/lib/definitions";
import Link from "next/link";

export default async function SpineCard(
    { edition }: 
    { edition: Edition })
{
    const spineUrl = getSpineUrl(edition);

    const scale = 1.5
    const height = edition.height * scale;
    const width = edition.thickness * scale;

    return (
        <div key={edition.id} className={`relative inline-block bg-white rounded-tl-sm rounded-tr-sm overflow-hidden`}>
            <Link 
                href={`/edition/${edition.id}`} 
            >
                <Image 
                    src={spineUrl || '/spine.png'} 
                    alt={edition.ed_title} 
                    title={edition.ed_title + ', ' + edition.year_pub + ', ISBN:' + edition.isbn} 
                    width={width} 
                    height={height}
                    className="hover:border-white hover:border-2 hover:rounded-lg hover:shadow-md"
                    style={{height: `${height}px`, width: `${width}px`}}
                />
            </Link>
        </div>
    )

}