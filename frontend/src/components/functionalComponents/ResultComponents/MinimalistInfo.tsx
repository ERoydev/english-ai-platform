
export default function MinimalistInfo({
    firstTitle,
    secondTitle,
    firstValue,
    secondValue,
}: {
    firstTitle: string;
    secondTitle: string;
    firstValue: string | number;
    secondValue: string | number;
}) {
    return(
        <div className="flex gap-5 pb-2">
            <p className='text-md'>
                <span className='text-gray-500 font-semibold'>{firstTitle}:</span> <span className='font-bold text-md'>{firstValue}</span>
            </p>

            <p className='text-md'>
                <span className='text-gray-500 font-semibold'>{secondTitle}:</span> <span className='font-bold text-md'>{secondValue}</span>
            </p>
        </div> 
    );
} 