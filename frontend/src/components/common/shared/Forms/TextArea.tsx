export default function TextArea({
    title,
    textareaId,
    placeholder,
    value,
    onChange,
    validationError,
    textareaName
}) {
    return(
        <div className="w-full max-md:mb-24">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                Your message here
            </label>
                
            <textarea 
                id="message" 
                rows='6' 
                className="input" 
                placeholder={placeholder}
                name={textareaName} 
                value={value}
                onChange={onChange}
            >
            </textarea>


            <p className="text-red-500 text-xs italic">{validationError}</p>
        </div>
    );
}