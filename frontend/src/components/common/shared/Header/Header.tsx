import React from 'react';

interface HeaderProps {
    title: string; /* The title that is going to have the common header styling */
    size: string; /* pass {text-2xl} ... type of parameter*/
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
        <div data-testid="message-container">
            {infoText && <p className='info-text'>{infoText}</p>}
            
            <h1 className={`xl:${size} ${classNames} text-3xl`}>
                {title}
                <span className={`${coloredClass}`}>
                    {coloredText}
                </span>
            </h1>

        </div>
    );
}

export default Header;