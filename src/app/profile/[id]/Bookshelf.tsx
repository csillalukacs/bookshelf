'use client'

import { Edition } from "@/app/lib/definitions"
import { Canvas } from "@react-three/fiber"
import BookMesh from "./BookMesh"
import { OrbitControls } from '@react-three/drei'


export default function Bookshelf({list}: {list: Edition[]}) 
{    
    return (
        <div id="canvas-container" className="w-[80%] h-[50vh] mx-auto bg-gray-100">
            <Canvas >
                <OrbitControls />
                <ambientLight intensity={0.1} />

                <directionalLight color="white" position={[0, 0, 5]} intensity={2} />
                <directionalLight color="white" position={[5, 0, 0]} intensity={2} />
                <directionalLight color="white" position={[-5, 0, 0]} intensity={1} />
                <directionalLight color="white" position={[0, 5, 0]} intensity={1} />

                {list.map((edition, i) => 
                    {
                        return <BookMesh 
                                    key={edition.id} 
                                    edition={edition} 
                                    position={[i-4, 0, 0]} 
                                />
                })
                }
            </Canvas>
        </div>
    )
}