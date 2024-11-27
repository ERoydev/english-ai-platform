import { Link, useLocation, useNavigate } from "react-router-dom";
import Path from "../../../Paths";
import { useEffect, useState } from "react";
import Links from "./links";



export default function SideBar({
    currentLocation,
}: {
    currentLocation: string;  // Replace with the actual location prop type when available
}) {    
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState<string>("");

    // Synchronize activeLink with the currentLocation on load or update
    useEffect(() => {
        setActiveLink(currentLocation);
    }, [currentLocation]);

    const handleNavigation = (e: Event) => {
        const target = e.target as HTMLElement;

        const currentLink: string | null = target.textContent?.toLowerCase() || null;


        if (currentLink && currentLink !== currentLocation) {
            // I need to make sure to not navigate to current location again
            const linkPath: string = Links[currentLink as keyof typeof Links];

            navigate(linkPath);
        } 
    }

    // Dynamically determine class based on active state
    const getClassName = (linkName: string): string => {
        return activeLink === linkName
            ? "border-l-blue-700 text-blue-700"
            : "border-transparent";
    };


    return(
    <div className="col-span-2 hidden sm:block">
        <ul>
            <li onClick={(e) => handleNavigation(e)} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${getClassName('profile')}`}>Profile</li>
            
      
            <li onClick={(e) => handleNavigation(e)} className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${getClassName('settings')}`}>Settings</li>

        </ul>
    </div>
    );
}