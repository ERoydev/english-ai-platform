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

const WindowItem: React.FC<WindowItemProps> = ({ title, text, icon}) => {
    return (
        <div className='w-[31%] max-md:w-full pb-5 flex flex-col gap-3 window px-4 py-4 upwards hover:bg-slate-200'>

            <FontAwesomeIcon icon={icon} className='w-[1.5rem] h-[1.5rem] max-xl:w-[1rem] max-xl:h-[1rem] bg-blue-600 py-3 px-3 rounded-full text-white' />
            <h1 className='font-semibold text-md max-xl:text-sm'>{title}</h1>
            <p className='text-slate-600 font-medium text-sm max-xl:text-xs'>{text}</p>
        </div>
    );
}

export default WindowItem;