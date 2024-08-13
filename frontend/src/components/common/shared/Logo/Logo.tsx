import globus from "../../../../assets/images/globus.png";
import { Link } from "react-router-dom";
import Path from "../../../../Paths";
import React from "react";

interface LogoProps {
    color?: string;
}

const Logo: React.FC<LogoProps> = ({ color }) => {
    return(
        <Link to={Path.Home}>
            <h1 data-testid="container" className={`${color} font-bold text-2xl max-md:text-xl flex items-center gap-2 scale-95 hover:scale-100 hover:cursor-pointer hover:text-slate-700 transition`}>
                <img src={globus} className="w-16 h-16 rounded-full " alt="Logo" />
                    LexiLearn
            </h1>
        </Link>
);
}

export default Logo;