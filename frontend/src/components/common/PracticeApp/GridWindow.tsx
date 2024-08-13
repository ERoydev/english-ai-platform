import vocabulary from "../../../assets/images/Practice/vocabulary.jpg";


export default function GridWindow({
    label,
    size,
}: {
    label: string;
    size: string; /* pass sizes like `h-32 md:h-64`, ` */
}) {
    return(
        <div
        className={`${size} window relative hover:cursor-pointer overflow-hidden flex justify-center items-center`}>

            <span className="absolute top-5 left-5 font-bold text-white text-2xl z-20">{label}</span>

            <div className="overlay">
                <img src={vocabulary} alt="" />
            </div>
    </div>

    );
}