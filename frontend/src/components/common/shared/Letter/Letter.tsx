import React from 'react';

/*
This function expects tailwind classes for the specific arguments that are going to be used in className

*/

type LetterProps = {
    title: string; // Just string title for my paragraph
    bgColor: string; // (bg-white, bg-slate-700)
    textColor: string; // (text-slate-700)
    size: string; // I specify size and can add font-weight here (text-lg, font-bold)
    positionOptions?: string; // Here i use absolute position options like (left-5, bottom-0 ....) as arguments
    rotateClass?: string; // Rotate class must be tailwind class like (rotate-6 or -rotate-12)
}

const Letter: React.FC<LetterProps> = ({ title, bgColor, textColor, size, positionOptions=null, rotateClass='rotate-0'}) => {
    if (!positionOptions) {
        positionOptions = 'bottom-10 left-1/2 transform -translate-x-1/2';
    }


    return(
        <div className={`${bgColor} ${textColor} ${size} ${positionOptions} ${rotateClass}  absolute z-10 tracking-wide rounded-xl px-4 py-3 shadow-lg shadow-cyan-500/50 border border-slate-200`}>
            <p>{title}</p>
        </div>
    );
}

export default Letter;