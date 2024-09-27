

export default function GridWindow({
    label,
    size,
    img,
}: {
    label: string;
    size: string; /* pass sizes like `h-32 md:h-64`, ` */
    img: string;
}) {
    return(
        <div
        className={`${size} window relative hover:cursor-pointer overflow-hidden flex justify-center items-center`}>
    
        <span className="absolute top-5 left-5 font-bold text-white text-2xl z-20">{label}</span>
    
        <div className="relative w-full h-full">
            {/* Image with zoom effect */}
            <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
            
            {/* Dark overlay to make the image darker */}
            <div className="absolute inset-0 bg-black opacity-15 pointer-events-none"></div>
        </div>
    </div>
    

    );
}