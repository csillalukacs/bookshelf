

export function SelectInput({ disabled, name, list, label } : 
    { disabled: boolean, name: string, list: any[], label? : string }
) 
{
    return (
        <div className="flex flex-col gap-1">
            <label className="text-black" htmlFor={name + "Input"}>
                {label || name}
            </label>
            <select 
                className="bg-white text-black border-1 border-black rounded-lg p-2" 
                name={name} 
                disabled={disabled}
                id={name + "Input"}
            >
                {list.map((el) => (
                    <option key={el.id} value={el.id}>
                        {el.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
