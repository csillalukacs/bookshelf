'use client'

import { Edition } from "@/app/lib/definitions"
import { Canvas } from "@react-three/fiber"
import BookMesh from "./BookMesh"
import { OrbitControls } from '@react-three/drei'


export default function Bookshelf({list}: {list: Edition[]}) 
{    
    const scale = 0.02;
    let x = -100;

    return (
        <div id="canvas-container" className="w-[80%] h-[50vh] mx-auto bg-gray-100">
            <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5]} }>
                <OrbitControls />
                <ambientLight intensity={0.1} />

                <directionalLight color="white" position={[0, 0, 5]} intensity={2} />
                <directionalLight color="white" position={[5, 0, 0]} intensity={2} />
                <directionalLight color="white" position={[-5, 0, 0]} intensity={1} />
                <directionalLight color="white" position={[0, 5, 0]} intensity={1} />

                {list.map((edition, i, a) => 
                    {
                        if (i>0) x += a[i-1].thickness/2 + a[i].thickness/2;
                        const y = edition.height/2 - 100;
                        const z = edition.width/2;
                        return <BookMesh 
                                    key={edition.id} 
                                    edition={edition} 
                                    position={[x*scale, y*scale, z*scale]} 
                                    scale={scale}
                                />
                })
                }
            </Canvas>
        </div>
    )
}