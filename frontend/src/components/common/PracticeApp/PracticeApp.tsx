// Components
import Logo from "../shared/Logo/Logo";
import MenuItem from "./MenuItem";
import Button from "../shared/Button/Button";
import Header from "../shared/Header/Header";
import GridWindow from "./GridWindow";

// Mapping Files
import {Icons, Images} from "./index.tsx";

// FontAwesome
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState } from "react";
import MobileButton from "../shared/Button/MobileButton.tsx";


export default function PracticeApp() {
    const userData = useSelector(state => state.auth.userInfo);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const mobileButtonHandler = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return(
        <section className="">
            
            {/* MOBILE BUTTON */}
            <MobileButton buttonHandlerFunction={mobileButtonHandler} />

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
                    
                    <div className="pb-5">
                        <MobileButton buttonHandlerFunction={mobileButtonHandler} />
                    </div>
          

                    {/* Menu Links */}
                    <ul className="space-y-4 font-medium">
                        <MenuItem label="Learning Modules" icon={Icons.LearningModule} />
                        <MenuItem label="Goals and Achievements" icon={Icons.Goals} />
                        <MenuItem label="Content & Resources" icon={Icons.Resources} />
                        <MenuItem label="Notifications" icon={Icons.Notifications} />
                        <MenuItem label="Learning Paths" icon={Icons.LearningPaths} />
                        <MenuItem label="Logout" icon={Icons.Logout}/>

                        <hr className="border-2 border-gray-300 my-4" />

                        <li className="flex justify-center items-center absolute inset-x-0 bottom-10 pt-5">
                            <Button label="Upgrade Plan" backgroundColor="bg-white" textColor="text-black"/>
                        </li>
                    </ul>

                </div>

            </aside>
            {/* END OF SIDEBAR */}
            
            {/* Main Content Boxes here !!! */}
            <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Hello back, " customClass="mb-5" size={"text-3xl"} coloredText={userData.user ? userData?.user?.email : 'Anonymous'} coloredClass="secondary-header-color"/>
                <div className="flex gap-5 items-center py-10 border-b-2">
                    <div>
                        <FontAwesomeIcon icon={faClock} className="w-[50px] h-[50px] text-gray-300" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-gray-500 text-lg">Speaking Time</h1>
                        <h1 className="font-bold text-black text-3xl leading-8">81 min</h1>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-10">
                    <GridWindow label="Vocabulary" size="h-32 md:h-64" img={Images.vocabulary} />

                    <GridWindow label="Grammar" size="h-32 md:h-64" img={Images.grammar} />

                    <GridWindow label="Speaking" size="h-32 md:h-64" img={Images.speaking} />
                    
                    <GridWindow label="Reading & Writting" size="h-32 md:h-64" img={Images.reading} />
                </div>

                <div
                    className="window h-96 mb-4"
                ></div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div
                    className="window h-48 md:h-72"
                    ></div>
                    <div
                    className="window h-48 md:h-72"
                    ></div>
                    <div
                    className="window h-48 md:h-72"
                    ></div>
                    <div
                    className="window h-48 md:h-72"
                    ></div>
                </div>

                {/* <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
                ></div> */}
                
                {/* <div className="grid grid-cols-2 gap-4">
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                    ></div>
                </div> */}
            </div>

        </section>
    );
}