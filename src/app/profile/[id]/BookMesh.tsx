'use client'

import { Edition } from "@/app/lib/definitions";
import { getCoverUrl, getSpineUrl } from "@/app/lib/utils";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { Mesh } from "three";

export default function BookMesh({edition, position, scale}: 
    {edition: Edition, position: [number, number, number], scale: number})
{
    const [rotationX, setRotationX] = useState(0)
    const [positionZ, setPositionZ] = useState(position[2])

    const myMesh = useRef<Mesh>(null);
    
    let coverUrl = getCoverUrl(edition)
    if (!coverUrl) coverUrl = "/cover.jpeg";

    let spineUrl = getSpineUrl(edition)
    if (!spineUrl) spineUrl = "/spine.png";

    const [cover, spine] = useTexture([coverUrl, spineUrl])

    useFrame(({ clock }) => 
    {
        if (myMesh.current)
        {
            if (Math.abs(myMesh.current.rotation.x - rotationX) > 0.01)
                myMesh.current.rotation.x = 0.001 * clock.elapsedTime * (rotationX - myMesh.current.rotation.x) + myMesh.current.rotation.x;
            else 
                myMesh.current.rotation.x = rotationX;
            if (Math.abs(myMesh.current.position.z - positionZ) > 0.01)
                myMesh.current.position.z = 0.001 * clock.elapsedTime * (positionZ - myMesh.current.position.z) + myMesh.current.position.z;
            else 
                myMesh.current.position.z = positionZ;
        }    
    })

    const handleClick = (e: Event) => 
    {
        e.stopPropagation();
        if (rotationX === 0) setRotationX(Math.PI/8);
        else setRotationX(0);
        if (positionZ === position[2]) setPositionZ(position[2] + 100 * scale);
        else setPositionZ(position[2]);
    }

    return (
        <mesh position={position} ref={myMesh} onClick={handleClick}>
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