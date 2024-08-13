
export default function CourseItem({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return(
        <div className={`${className} window w-[31%] h-[300px]`}>
            <h1>{label}</h1>
        </div>
    );
}