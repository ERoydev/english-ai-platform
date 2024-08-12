// Components
import Logo from "../shared/Logo/Logo";
import MenuItem from "./MenuItem";
import Button from "../shared/Button/Button";

// Mapping Files
import Icons from "./Icons";
import BorderBar from "../../decoration/BorderBar";
import Header from "../shared/Header/Header";

export default function PracticeApp() {
    return(
        <section>
            
            {/* MOBILE BUTTON */}
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            
            {/* SIDEBAR */}
            <aside id="logo-sidebar" className="fixed top-38 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">

          

                    {/* Menu Links */}
                    <ul className="space-y-4 font-medium">
                        <MenuItem label="Learning Modules" icon={Icons.LearningModule} />
                        <MenuItem label="Goals and Achievements" icon={Icons.Goals} />
                        <MenuItem label="Content & Resources" icon={Icons.Resources} />
                        <MenuItem label="Notifications" icon={Icons.Notifications} />
                        <MenuItem label="Learning Paths" icon={Icons.LearningPaths} />
                        <MenuItem label="Logout" icon={Icons.Logout}/>

                        <hr className="border-2 border-gray-300 my-4" />

                        <li className="flex justify-center items-center pt-5">
                            <Button label="Become Pro" />
                        </li>
                    </ul>

                </div>

            </aside>
            {/* END OF SIDEBAR */}
            
            {/* Main Content Boxes here !!! */}
            <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Hello, User!" customClass="mb-5"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div
                    className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    ></div>
                    <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
                    ></div>
                </div>

                <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
                ></div>

                <div className="grid grid-cols-2 gap-4 mb-4">
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
                </div>

                <div
                    className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
                ></div>
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>
            </div>

        </section>
    );
}