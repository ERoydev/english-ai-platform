
export default function ResultTitle({
    text
}: {
    text: string;  // The text to be displayed in the title
}) {
    return(
        <div className="centered-absolute -translate-y-1/2">
            <h1 className="bg-gray-400 rounded-lg py-2 px-5 font-extrabold text-2xl max-lg:text-sm max-md:text-xs" >{text}</h1>
        </div>
    );
}