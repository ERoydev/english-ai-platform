

export default function ScoreResult({
    gradeLevel,
    gradeDescription,
    totalScore
}:
{
    gradeLevel: string,
    gradeDescription: string,
    totalScore: number | string
}) {
    return(
        <div className='secondary-window px-10 py-14 my-10 flex gap-10 justify-between items-center'>
            <div className='flex flex-col gap-3'>
                <p className='text-md font-bold'>Scores</p>
                <h1 className='font-bold text-2xl text-gray-700'>Level: {gradeLevel}</h1>
                <p className='text-gray-800'>{gradeDescription}</p>
            </div>

            <div className='bg-blue-500 p-5 rounded-lg aspect-square flex items-center'>
                <h1 className='text-4xl font-bold text-white'>{totalScore}</h1>
            </div>
      </div>
    );
}