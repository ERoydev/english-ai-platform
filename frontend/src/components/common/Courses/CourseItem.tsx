
export default function CourseItem({
    label,
    className,
    img,
}: {
    label: string;
    img: string;
    className?: string;
}) {
    return(
        <div className={`${className} window w-[31%] mb-5 max-md:w-full h-[300px] flex justify-center items-center overflow-hidden relative hover:cursor-pointer `}>
            <span className='absolute top-5 left-5 font-bold text-white text-2xl z-20 '>{label}</span>

            <div className="relative w-full h-full">
                <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
            </div>
            
            {/* Dark overlay to make the image darker */}
            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
        </div>
    );
}