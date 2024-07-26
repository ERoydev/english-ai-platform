import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
This component is created to show Window Item on the page with image and text bellow.
Its Item because tipically i iterate from array with objects and i pass objects properties as props in this component
*/

interface WindowItemProps {
    title: string;
    text: string;
    icon: string;
}

{/* <div className="relative w-[22%] window py-6 pb-24 px-5 flex flex-col gap-5  hover:cursor-pointer hover:bg-indigo-700 hover:text-slate-100 transition ease-in-out">
            <img src={`${imgUrl}`} alt="" className='rounded-lg' />
            <p className='px-1 text-center text-md'>{text}</p>

            <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2'>
                <Button label='Get Started'/>
            </div>
        </div> */}

const WindowItem: React.FC<WindowItemProps> = ({ title, text, icon}) => {
    return (
        <div className='w-[31%] pb-5 flex flex-col gap-3 window px-4 py-4 upwards hover:bg-slate-200'>

            <FontAwesomeIcon icon={icon} className='w-[1.5rem] h-[1.5rem] bg-blue-600 py-3 px-3 rounded-full text-white' />
            <h1 className='font-semibold text-md'>{title}</h1>
            <p className='text-slate-600 font-medium text-sm'>{text}</p>
        </div>
    );
}

export default WindowItem;