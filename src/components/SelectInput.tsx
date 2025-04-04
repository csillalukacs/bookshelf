

export function SelectInput({ disabled, name, list, label, className = "" } : 
    { disabled: boolean, name: string, list: any[], label? : string, className? : string }
) 
{
    return (
        <div className={"flex flex-col gap-1 " + className}>
            <label className="text-gray-500 text-sm" htmlFor={name + "Input"}>
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
