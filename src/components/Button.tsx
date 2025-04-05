export default function Button(
    { onClick, disabled, label, type, red } : 
    { onClick?: () => void, disabled: boolean, label: string, type?: string, red?: boolean }
)
{
    const className = "bg-[var(--button)] hover:bg-[var(--button-hover)] text-white font-bold py-2 px-4 rounded-full cursor-pointer"
    const textClassName = "py-2 px-4 hover:underline cursor-pointer" + (red ? ` text-red-600` : "text-[var(--dark)]")
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={type === "text" ? textClassName : className}
        >  
            {label}
        </button>
    )
}