import { useLocation } from "react-router-dom";
import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import Header from "../Header/Header";
import ScoreResult from "../../../functionalComponents/ResultComponents/ScoreResult";
import ScoreItem from "../../../functionalComponents/SpeechAnalysis/ScoreItem";
import TopicSectionDisplay from "../../../functionalComponents/ResultComponents/TopicSectionDisplay";
import { useSelector } from "react-redux";

export default function QuizResult() {
    const location = useLocation();
    const {data} = location.state || {};
    const userData = useSelector(state => state.auth.userInfo);

    console.log(userData)


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
 
            </div>
        </section>
        
    );
}