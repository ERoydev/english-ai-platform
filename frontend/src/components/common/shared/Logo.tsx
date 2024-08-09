import globus from "../../../assets/images/globus.png";

export default function Logo() {
    return(
        <h1 className="font-bold text-2xl max-md:text-xl flex items-center gap-2 scale-95 hover:scale-100 hover:cursor-pointer hover:text-slate-700 transition">
            <img src={globus} className="w-16 h-16 rounded-full " alt="Logo" />
                LexiLearn
        </h1>
);
}