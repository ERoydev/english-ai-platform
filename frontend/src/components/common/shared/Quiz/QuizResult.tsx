import { useLocation } from "react-router-dom";
import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import Header from "../Header/Header";

export default function QuizResult() {
    const location = useLocation();
    const {data} = location.state || {};

    console.log(data)

    return(
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col relative">
                <div>
                    <Header title="Quiz " coloredText="Result" size="text-3xl" coloredClass="secondary-header-color" />
                </div>

                <div className="flex gap-5">
                    <p className='text-md'>
                        <span className='text-gray-500 font-semibold'>Score:</span> <span className='font-bold text-md'>{data.total_score}</span>
                    </p>

                    <p className='text-md'>
                        <span className='text-gray-500 font-semibold'>Duration:</span> <span className='font-bold text-md'>{data.time_duration}</span>
                    </p>
                </div>
                
                {/* TODO MAKE DESIGN FOR ANALYSIS REUSABLE */}
                <div className='border-2 border-gray-500 window px-10 py-14 my-10 flex gap-10 items-center'>

                    <div className='flex flex-col gap-3'>
                        <p className='text-md font-bold'>Scores</p>
                        <h1 className='font-bold text-2xl text-gray-700'>Total score: {data.total_score}/{data.max_score}</h1>
                        <p className='text-gray-800'>{data.grade_info.description}</p>
                    </div>

                    <div className='bg-blue-500 p-5 rounded-lg aspect-square flex items-center'>
                        <h1 className='text-4xl font-bold text-white'>{data.grade_info.grade}</h1>
                    </div>
                </div>
            </div>
        </section>
        
    );
}