export function NumberInput({ disabled, name, label, className = "", defaultValue, required } : 
    { disabled: boolean, name: string, label? : string, className? : string, defaultValue? : number, required? : boolean }
) 
{
    return (
        <div className={"flex flex-col gap-1 " + className}>
            <label className="text-gray-500 text-sm" htmlFor={name + "Input"}>
                {label || name}
            </label>
            <input 
                className="bg-white text-black border-1 border-black rounded-lg p-2" 
                name={name} 
                disabled={disabled}
                type="number"
                id={name + "Input"}
                defaultValue={defaultValue}
                required={required}
            >
            </input>
        </div>
    );
}