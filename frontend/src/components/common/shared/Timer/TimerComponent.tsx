import React, { useState, useEffect } from 'react';

export default function TimerComponent({ pauseTimer }: { pauseTimer: boolean }) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Effect to control the timer based on `isRunning` state
    useEffect(() => {
        let timerId;

        if (isRunning) {
            timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime + 1);
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

    return (
        <div>
            <h1>Timer: {timeLeft} seconds</h1>
        </div>
    );
}
