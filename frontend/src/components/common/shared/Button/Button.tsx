

export default function Button({
    label,
    className
}: {
    label: string;
    className?: string;
}) {
    return (
        <button className={`${className} main-button`} data-testid="button">
            <span className="relative" data-testid="button-label">
                {label}
            </span>
        </button>
    );
}