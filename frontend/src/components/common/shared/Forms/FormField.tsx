
export default function FormField({
    title,
    validationError,
    fieldValue,
    onChange,
    inputName,
    inputType,
    placeholder,
}: {
    title: string,
    fieldValue: string, // Used to make this field part of controlled form so here should have something like values.first_name ....
    inputName: string // Used for controlled form to set new value for fieldValue parameter 
    validationError?: string | undefined, // Optional meaning i can use this for forms without showing validation error messages
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputType?: string // DEFAULT IS text
    placeholder?: string, 
}) {
    return(
        <div className="px-3 w-[50%] mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid">
                {title}
            </label>
            
            <input 
                className="input" 
                id="grid" 
                type={inputType ? inputType : 'text'}
                placeholder={placeholder}
                name={inputName} 
                value={fieldValue} 
                onChange={onChange}
            />
                {validationError && (
                    <p className="text-red-500 text-xs italic">{validationError}</p>
                )}
        </div>
    );
}