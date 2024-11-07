export default function AnswerItem({ id, text, isSelected, onSelect }) {
    return (
        <label
            className={`flex gap-2 p-3 rounded-md text-md relative items-center cursor-pointer transition-all duration-200 hover:bg-yellow-50
            ${isSelected ? 'border-2 border-yellow-500 bg-yellow-100' : 'bg-gray-50 border border-yellow-700'}`}
            htmlFor={id}
        >
            <div className="flex justify-center items-center">
                <input
                    name={`framework-custom-icon-${id}`}
                    type="radio"
                    className="relative peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:bg-yellow-600"
                    id={id}
                    value={text}
                    checked={isSelected} // Use isSelected to control checked state
                    onChange={onSelect} // Call onSelect when clicked
                />
                <span
                    className={`absolute transition-opacity duration-200 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <svg
                        className="w-3 h-3" 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg>
                </span>
            </div>
            <p>{text}</p>
        </label>
    );
}
