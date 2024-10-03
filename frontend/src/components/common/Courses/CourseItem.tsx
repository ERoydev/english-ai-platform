
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
        <div className={`${className} window w-[31%] mb-5 max-md:w-full h-[300px] flex justify-center items-center overflow-hidden relative hover:cursor-pointer bg-black`}>
            <span className='absolute top-5 left-5 font-bold text-slate-500 text-2xl z-20'>{label}</span>

            <div className="relative w-full h-full">
                <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
            </div>
        </div>
    );
}