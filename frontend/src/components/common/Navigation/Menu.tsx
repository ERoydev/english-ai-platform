import React from 'react';

import LinkComponent from '../shared/LinkComponent';
import Button from "../shared/Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Path from '../../../Paths.tsx'; /* File containing the route paths for each link */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


interface MenuProps {
    MenuClickHandler: () => void;
    isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ 
    MenuClickHandler,
    isOpen,
 }) => {


    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return(
        <>
            {/* Mobile Hamburger button */}
            <div className="xl:hidden flex gap-2 items-center">
                <button className="group h-14 w-14 rounded-xl hover:bg-slate-200" onClick={MenuClickHandler}>
                        <div className="grid justify-items-center gap-1.5">
                            <span className="h-1 w-8 rounded-full bg-gray-700 transition group-hover:rotate-45 group-hover:translate-y-2.5"></span>
                            <span className="h-1 w-8 rounded-full bg-gray-700 group-hover:scale-x-0 transition"></span>
                            <span className="h-1 w-8 rounded-full bg-gray-700 group-hover:-rotate-45 group-hover:-translate-y-2.5"></span>
                        </div>
                </button>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                onClick={MenuClickHandler}
                className="fixed inset-0 bg-black/50 z-40"
                ></div>
            )}
            
            {/* Menu links */}
            <ul className={`${isOpen ? 'absolute top-0 left-0 right-0 w-full backdrop-blur-xl bg-white/30 z-50 py-20 slide-down' : 'max-xl:hidden'} max-xl:flex-col flex gap-12 items-center`}>
                <div className={`${isOpen ? '' : 'hidden'} hover:cursor-pointer hover:text-blue-600 transition`} onClick={MenuClickHandler} >
                    <FontAwesomeIcon icon={faXmark} className='absolute w-[36px] h-[36px] top-5 right-5'/>
                </div>
                
                <li className={isOpen ? `text-lg`: ''}>
                    <LinkComponent label='Courses' path={Path.Courses} />
                </li>

                <li className={isOpen ? `text-lg`: ''}>
                    <LinkComponent label='Practice & Quizzes' path={Path.PracticeApp} />
                </li>

                <li className={isOpen ? `text-lg`: ''}>
                    <LinkComponent label="IELTS" path={Path.IELTS} />
                </li>


                <li className={isOpen ? `text-lg`: ''}>
                    {!isAuthenticated ?          
                        
                        <div className='flex gap-5'>
                            <Link to={Path.Login}>
                                <Button label='Login'/>
                            </Link>
                        </div>

                        :
                        <Link to={Path.Logout}>
                            <Button label='Logout' />
                        </Link>
                    }
                </li>
            </ul>
        </>
    );
}

export default Menu;