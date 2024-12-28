import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const InteractiveLoader = () => {
  const messages = [
    'Measuring fluency...',
    'Measuring vocabulary...',
    'Analyzing grammar...',
    'Checking pronunciation...'
  ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 1000); // Change message every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50'>
      <div className='flex flex-col items-center gap-5 border border-opacity-20 border-slate-700 rounded-2xl w-[400px] p-4 bg-slate-700'>
        <p className='font-bold text-xl text-white'>{currentMessage}</p>
        <Spinner />
      </div>
    </div>
  );
};

export default InteractiveLoader;
