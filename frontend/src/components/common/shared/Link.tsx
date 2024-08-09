
export default function Link({
    label
}: {
    label: string;
}) {
    return(
        <p className="group relative w-max hover:scale-105">
        <span><a href="#">{label}</a></span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
        </p>
    );
}