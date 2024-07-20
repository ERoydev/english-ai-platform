

export default function Button({
    label,
}: {
    label: string;
}) {
    return (
        <button className="main-button">
            <span className="relative">
                {label}
            </span>
        </button>
    );
}