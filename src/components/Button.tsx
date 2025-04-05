export default function Button(
    { onClick, disabled, label } : 
    { onClick?: () => void, disabled: boolean, label: string }
)
{
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className="bg-[var(--button)] hover:bg-[var(--button-hover)] 
            text-white font-bold py-2 px-4 rounded-full cursor-pointer"
        >
            {label}
        </button>
    )
}