export default function Heading({children, size = 4}: {children: React.ReactNode, size?: number})
{
    return <p className={`text-${size}xl font-bold my-${size}`}>
        {children}
    </p>
}