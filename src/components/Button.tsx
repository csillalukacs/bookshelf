export default function Button(
    { onClick, disabled, label, type } : 
    { onClick?: () => void, disabled: boolean, label: string, type?: string }
)
{
    const className = "bg-[var(--button)] hover:bg-[var(--button-hover)] text-white font-bold py-2 px-4 rounded-full cursor-pointer"
    const textClassName = "text-[var(--dark)] py-2 px-4 hover:underline cursor-pointer"
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