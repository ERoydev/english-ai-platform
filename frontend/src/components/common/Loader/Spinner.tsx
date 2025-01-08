

export default function Spinner() {
    return(
        <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-36 md:h-36 h-24 w-24 aspect-square rounded-full">
            <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
        </div>
    );
}