import React from 'react';

interface HeaderProps {
    title: string; /* The title that is going to have the common header styling */
    size: string;
    coloredText?: string;  /* I pass text string */
    coloredClass?: string; /* I pass in props class for the coloredText color (primary-header-color, secondary-header-color) defined in my index.css utilities */
    customClass?: string; /* Option class to remove or change margins primary */
    infoText?: string; /* Optional informative text */
}


const Header: React.FC<HeaderProps> = ({ title, coloredText, coloredClass, size, customClass, infoText}) => {
    let classNames = 'mb-20 font-bold';

    if (customClass) {
        classNames = customClass
    } 
    return(
        <>
            {infoText && <p className='info-text'>{infoText}</p>}
            
            <h1 className={`${size} ${classNames}`}>
                {title}
                <span className={`${coloredClass}`}>
                    {coloredText}
                </span>
            </h1>
        </>
    );
}

export default Header;