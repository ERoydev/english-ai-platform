import React from 'react';

interface HeaderProps {
    title: string; /* The title that is going to have the common header styling */
    coloredText: string;  /* I pass text string */
    coloredClass: string; /* I pass in props class for the coloredText color (primary-header-color, secondary-header-color) defined in my index.css utilities */
    customClass?: string; /* Option class to remove or change margins primary */
}


const Header: React.FC<HeaderProps> = ({ title, coloredText, coloredClass, customClass}) => {
    return(
        <h1 className={`text-4xl font-black mb-24 ${customClass}`}>
            {title}
            <span className={`${coloredClass}`}>
                {coloredText}
            </span>
        </h1>
    );
}

export default Header;