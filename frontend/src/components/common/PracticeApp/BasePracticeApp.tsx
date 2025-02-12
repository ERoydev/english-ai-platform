/* 
This is basePractice window with the sidebar. The components inside PracticeApp will display this component 
*/

import { useState } from "react";
import MobileButton from "../shared/Button/MobileButton";
import Logo from "../shared/Logo/Logo";
import MenuItem from "./reusable/MenuItem";
import { Icons } from "./index";
import { Link } from "react-router-dom";
import Path from "../../../Paths";

export default function BasePracticeApp() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const mobileButtonHandler = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return(

        <div>
            {/* MOBILE BUTTON */}
            <div className="mt-2 ms-3">
                <MobileButton buttonHandlerFunction={mobileButtonHandler} />
            </div>

            {/* OVERLAY Click outside of menu to close menu in mobile version */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-black opacity-50" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
      
            
            {/* SIDEBAR */}
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform ${isSidebarOpen ? '' : '-translate-x-full md:translate-x-0'}`} aria-label="Sidebar">
                <div className="relative h-full px-3 py-4 overflow-y-auto bg-gray-800">

                    <div className="pb-10 max-md:hidden">
                        <Logo color={"text-gray-200"} />
                    </div>
                    
                    {isSidebarOpen && 
                        <div className="flex justify-between items-center pb-5 pr-2">

                            <div className="">
                                <MobileButton buttonHandlerFunction={mobileButtonHandler} />
                            </div>

                            <div className="w-4 text-gray-500 hover:cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
                                <svg className="hover:fill-red-800 focus:fill-red-800" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>  
                            </div>
                        </div>
                    }
          

                    <ul className="space-y-4 font-medium flex-grow">
                        {/* <MenuItem label="My Progress" icon={Icons.Progress} />
                        <MenuItem label="Goals and Achievements" icon={Icons.Goals} /> */}

                        <li>
                            <Link to={Path.Pricing}>
                                <MenuItem label="Update Plan" icon={Icons.UpdatePlan} />
                            </Link>
                        </li>

                        <li>
                            <Link to={Path.Home}>
                                <MenuItem label="Back to Home" icon={Icons.Home} />
                            </Link>
                        </li>

                        <hr className="border-2 border-gray-300 my-4" />
                    </ul>

                </div>

            </aside>
            {/* END OF SIDEBAR */}
        </div>
    );
}