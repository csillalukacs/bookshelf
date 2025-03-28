export function NumberInput({ disabled, name, label } : 
    { disabled: boolean, name: string, label? : string }
) 
{
    return (
        <>
            <label className="text-black" htmlFor={name + "Input"}>
                {label || name}
            </label>
            <input 
                className="bg-white text-black border-1 border-black rounded-lg p-2" 
                name={name} 
                disabled={disabled}
                type="number"
                id={name + "Input"}
            >
            </input>
        </>
    );
}