'use client'

import { View } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewSwitcher({view}: {view: View})
{
    const router = useRouter()
    const [selected, setSelected] = useState(view);

    const options = ["cover", "spine", "3d"];
    const labels = ["Cover", "Spine", "3D"];

    const handleChange = (option: View) => 
    {
        setSelected(option);
        router.push(`?view=${option}`);
    };

    return (
        <div className="flex flex-row gap-0">
            {options.map((option, i) => 
                <button 
                    key={option} 
                    className={`${option === selected ? "bg-[var(--dark)] text-white" : "bg-gray-100"} 
                        text-sm p-1 rounded-sm text-gray-500 cursor-pointer`}
                    onClick={() => handleChange(option as View)}
                >
                    {labels[i]}
                </button>
            )}
        </div>
    )
}