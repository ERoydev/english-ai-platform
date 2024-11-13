export const formatTimeForDjango = (time: {minutes: number, seconds: number}) => {
    const minutes = String(time.minutes).padStart(2, '0');
    const seconds = String(time.seconds).padStart(2, '0');
    return `00:${minutes}:${seconds}`;
};
