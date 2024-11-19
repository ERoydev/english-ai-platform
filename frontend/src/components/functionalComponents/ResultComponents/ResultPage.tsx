import { useLocation } from "react-router-dom";
import Header from "../../common/shared/Header/Header";
import ScoreResult from "./ScoreResult";
import TopicSectionDisplay from "./TopicSectionDisplay";
import ScoreItem from "../SpeechAnalysis/ScoreItem";
import BasePracticeApp from "../../common/PracticeApp/BasePracticeApp";


export default function ResultPage() {
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

                {data.quiz_scores && (
                    <>
                        <ScoreResult
                            gradeLevel={data.quiz_scores.grade_info.grade}
                            gradeDescription={data.quiz_scores.grade_info.description}
                            totalScore={`${data.quiz_scores.total_score}/${data.quiz_scores.max_score}`}
                            />
        
                        <TopicSectionDisplay
                            headerText="Information"
                            >
                            <ScoreItem title={'Correct Answers'}  main_text={data.quiz_scores.correct_answers} info_text={'Correct answered questions'} />
                            <ScoreItem title={'Incorrect Answers'}  main_text={data.quiz_scores.incorrect_answers} info_text={'Incorrect answered questions'} />
                        </TopicSectionDisplay>
                    </> 
                )}

                {data.speech_scores && (
                    <>
                        <ScoreResult
                            gradeLevel={data.speech_scores.language_scores.grade.grade}
                            gradeDescription={data.speech_scores.language_scores.grade.description}
                            totalScore={`${data.speech_scores.language_scores.total_score}`}
                        />
                    </> 
                )}
            </div>
        </section>
        
    );
}