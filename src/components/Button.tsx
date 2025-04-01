export default function Button(
    { onClick, disabled, label } : 
    { onClick?: () => void, disabled: boolean, label: string }
)
{
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
        >
            {label}
        </button>
    )
}