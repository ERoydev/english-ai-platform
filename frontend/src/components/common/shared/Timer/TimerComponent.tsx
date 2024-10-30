import React, { useState, useEffect } from 'react';

export default function TimerComponent({ pauseTimer, isFinished }: { pauseTimer: boolean, isFinished: boolean}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect to control the timer based on `isRunning` state
  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds + 1 === 60) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    // Cleanup the interval when the component is unmounted or `isRunning` changes
    return () => clearInterval(timerId);
  }, [isRunning]);

  // Effect to handle changes to the `pauseTimer` prop
  useEffect(() => {
    if (pauseTimer) {
      setIsRunning(true); // Start the timer
    } else {
      setIsRunning(false); // Pause the timer
    }
  }, [pauseTimer]);

  // Format minutes and seconds to always have two digits
  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
      <div className="bg-blue-600 py-3 px-5 rounded-lg max-md:px-3">


        {!isRunning ? (
            <div>
                <h1 className='font-bold text-white'>{!isFinished ? 'Paused' : 'Finished'}</h1>
            </div>

        ) : 
        (
            <div className='flex gap-2 items-center'>
                <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                    <div
                    key={index}
                    className="w-1 h-3 bg-green-500 animate-audio-bar"
                    ></div>
                ))}
                </div>

                <div className='font-bold text-white text-md'>
                    {formatTime(minutes)}:{formatTime(seconds)}
                </div>

            </div>

        )}

      </div>
    
  );
}
