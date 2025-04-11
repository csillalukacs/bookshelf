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

    const speed = 0.01;
    const tolerance = 0.01;

    const mesh = useRef<Mesh>(null);
    
    let coverUrl = getCoverUrl(edition)
    if (!coverUrl) coverUrl = "/cover.jpeg";

    let spineUrl = getSpineUrl(edition)
    if (!spineUrl) spineUrl = "/spine.png";

    const [cover, spine] = useTexture([coverUrl, spineUrl])

    useFrame(({ clock }) => 
    {
        if (mesh.current)
        {
            if (Math.abs(mesh.current.rotation.x - rotationX) > tolerance)
                mesh.current.rotation.x += speed * clock.elapsedTime * (rotationX - mesh.current.rotation.x);
            else 
                mesh.current.rotation.x = rotationX;
            if (Math.abs(mesh.current.position.z - positionZ) > tolerance)
                mesh.current.position.z += speed * clock.elapsedTime * (positionZ - mesh.current.position.z);
            else 
                mesh.current.position.z = positionZ;
        }    
    })

    const handleClick = (e: Event) => 
    {
        e.stopPropagation();

        if (rotationX === 0) 
            setRotationX(Math.PI/8);
        else setRotationX(0);

        if (positionZ === position[2]) 
            setPositionZ(position[2] + 100 * scale);
        else setPositionZ(position[2]);
    }

    return (
        <mesh position={position} ref={mesh} onClick={handleClick}>
            <boxGeometry args={[edition.thickness*scale, edition.height*scale, edition.width*scale]}/>
            <meshStandardMaterial attach="material-0" map={cover}/> {/*right*/}
            <meshStandardMaterial attach="material-1" color={"green"}/> {/*left*/}
            <meshStandardMaterial attach="material-2" color={"yellow"}/> {/*top*/}
            <meshStandardMaterial attach="material-3" color={"yellow"}/> {/*bottom*/}
            <meshStandardMaterial attach="material-4" map={spine}/> {/*front*/}
            <meshStandardMaterial attach="material-5" color={"yellow"}/> {/*back*/}
        </mesh>
    )
}