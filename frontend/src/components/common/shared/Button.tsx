

export default function Button({
    label,
    className
}: {
    label: string;
    className?: string;
}) {
    return (
        <button className={`${className} main-button`}>
            <span className="relative">
                {label}
            </span>
        </button>
    );
}