

export function TextInput(
    { disabled, name, list, label, required, className = "", defaultValue } : 
    { disabled: boolean, name: string, list?: any[], label? : string, 
        required?: boolean, className? : string, defaultValue? : string }
) 
{
    return (
        <div className={"flex flex-col gap-1 " + className} >
            <label className="text-gray-500 text-sm" htmlFor={name + "Input"}>
                {label || name}
            </label>
            <input
                className="bg-white text-black border-1 border-black rounded-lg p-2"
                type="text"
                name={name}
                list={name}
                disabled={disabled}
                id={name + "Input"}
                autoComplete="off"
                required={required}
                defaultValue={defaultValue}
            />
            {  
            list &&          
                <datalist id={name}>
                    {list.map((el) => (
                        <option key={el.id} value={el.name} />
                    ))}
                </datalist>
            }
        </div>
    );
}
