

export default function Button({
    label,
    className
}: {
    label: string;
    className?: string; /* Add custom classNames (optional) */
}) {
    return (
        <button className={`${className} main-button`} data-testid="button">
            <span className="relative" data-testid="button-label">
                {label}
            </span>
        </button>
    );
}