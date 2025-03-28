

export function SelectInput({ disabled, name, list, label } : 
    { disabled: boolean, name: string, list: any[], label? : string }
) 
{
    return (
        <>
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
        </>
    );
}
