

export default function Button({
    label,
    className,
    backgroundColor,
    textColor,
}: {
    label: string;
    className?: string; /* Add custom classNames (optional) */
    backgroundColor?: string;
    textColor?: string;
}) {
    let Background = "bg-gray-800"; /* Thats set as a default color because this is the website design*/
    let Text = "text-white";

    if (backgroundColor) {
        Background = backgroundColor;
    }

    if (textColor) {
        Text = textColor;
    }

    return (
        <button className={`${className} ${Background} ${Text} main-button`} data-testid="button">
            <span className="relative" data-testid="button-label">
                {label}
            </span>
        </button>
    );
}