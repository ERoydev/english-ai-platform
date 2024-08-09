import React, { useState, useEffect } from 'react';
import Letter from './Letter';


const LetterCycle = ({
     texts 
}:{
    texts: string[]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 6000); // Change text every 6 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="text-cycler">
        <div className='fade-animation'>
            <Letter title={texts[currentIndex]} bgColor='bg-white' textColor="text-black" size='text-sm font-medium' />
        </div>
    </div>
  );
};

export default LetterCycle;
