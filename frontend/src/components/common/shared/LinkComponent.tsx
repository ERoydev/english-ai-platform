import { Link } from "react-router-dom";

/* This component just apply animation effect on my links */

export default function LinkComponent ({
    label,
    path,
}: {
    label: string;
    path: string;
}) {
    return(
        <p className="group relative w-max hover:scale-105" >
            <span><Link to={path}>{label}</Link></span>
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
        </p>
    );
}