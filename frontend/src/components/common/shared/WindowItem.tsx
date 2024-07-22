import React from 'react';

/*
This component is created to show Window Item on the page with image and text bellow.
Its Item because tipically i iterate from array with objects and i pass objects properties as props in this component
*/

interface WindowItemProps {
    imgUrl: string;
    text: string;
}

const WindowItem: React.FC<WindowItemProps> = ({ imgUrl, text}) => {
    return (
        <div className="w-[22%] window py-6 px-5 flex flex-col gap-5 hover:cursor-pointer hover:bg-slate-100">
            <img src={`${imgUrl}`} alt="" className='rounded-lg' />
            <p className='px-1 font-medium text-center'>{text}</p>
        </div>
    );
}

export default WindowItem;