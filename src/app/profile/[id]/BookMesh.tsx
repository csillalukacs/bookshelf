'use client'

import { Edition } from "@/app/lib/definitions";
import { getCoverUrl, getSpineUrl } from "@/app/lib/utils";
import { useTexture } from "@react-three/drei";

export default function BookMesh({edition, position}: 
    {edition: Edition, position: [number, number, number]})
{
    const scale = 0.02; 
    
    let coverUrl = getCoverUrl(edition)
    if (!coverUrl) coverUrl = "/cover.jpeg";

    let spineUrl = getSpineUrl(edition)
    if (!spineUrl) spineUrl = "/spine.png";

    const [cover, spine] = useTexture([coverUrl, spineUrl])

    return (
        <mesh position={position}>
            <boxGeometry args={[edition.thickness*scale, edition.height*scale, edition.width*scale]}/>
            <meshStandardMaterial attach="material-0" map={cover}/> {/*right*/}
            <meshStandardMaterial attach="material-1" color={"green"}/> {/*left*/}
            <meshStandardMaterial attach="material-2" color={"yellow"}/> {/*top*/}
            <meshStandardMaterial attach="material-3" color={"yellow"}/> {/*bottom*/}
            <meshStandardMaterial attach="material-4" map={spine}/> {/*front*/}
            <meshStandardMaterial attach="material-5" color={"purple"}/> {/*back*/}
        </mesh>
    )
}