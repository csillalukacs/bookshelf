
export default function Heading({children, size = 4, className}: {children: React.ReactNode, size?: number, className?: string})
{
    // if these are not included, tailwind may prune the corresponding classes
    const sizes = ["text-xl my-1", "text-2xl my-2",  "text-3xl my-3", "text-4xl my-4", "text-5xl my-5", 
        "text-6xl my-6", "text-7xl my-7", "text-8xl my-8", "text-9xl my-9", "text-10xl my-10"
    ]

    return <p className={`${sizes[size - 1]} my-${size} ${className}`}>
        {children}
    </p>
}