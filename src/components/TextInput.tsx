

export function TextInput(
    { disabled, name, list, label } : 
    { disabled: boolean, name: string, list?: any[], label? : string }
) 
{
    return (
        <>
            <label className="text-black" htmlFor={name + "Input"}>
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
            />
            {  
            list &&          
                <datalist id={name}>
                    {list.map((el) => (
                        <option key={el.id} value={el.name} />
                    ))}
                </datalist>
            }
        </>
    );
}
