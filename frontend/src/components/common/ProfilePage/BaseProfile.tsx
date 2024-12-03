import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import { useLocation } from "react-router-dom";

export default function BaseProfile({children}) {
    const location = useLocation();


    return(
    <div className="max-container min-h-screen max-w-screen-xl pt-20 px-10 bg-gray-100 rounded-xl mb-20">
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <MobileSideBar />

            <SideBar currentLocation={location.pathname.split('/')[2].toLowerCase()} />

            {children}
        </div>
    </div>

    );
}