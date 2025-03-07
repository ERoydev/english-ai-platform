

export default function GridWindow({
    label,
    size,
    img,
    labelClass,
    customClass,
}: {
    label: string;
    size: string; /* pass sizes like `h-32 md:h-64`, ` */
    img: string;
    labelClass?: string; /* Used for custom label styling */
    customClass?:string; /* Thats used to override the defaultTextColor */
}) {
    const defaultLabelClasses = 'absolute top-5 left-5 font-bold text-2xl'
    let appliedClass = defaultLabelClasses;
    const defaultTextColor = 'text-white';

    if (labelClass) {
        appliedClass = labelClass;
    } 
    if (customClass) {
        appliedClass += ' ' + customClass + defaultTextColor;

    }

    if (!labelClass && !customClass) {
        appliedClass = defaultLabelClasses + ' ' + defaultTextColor;
    }
    return(
        <div className={`${size} window relative hover:cursor-pointer overflow-hidden flex justify-center items-center`}>
            <span className={`${appliedClass} z-20`}>{label}</span>
            <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110 will-change-transform">
                {/* Image with gradient overlay */}
                <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.7)',
                    }}
                    loading="lazy"
                />
            </div>
        </div>

    

    );
}