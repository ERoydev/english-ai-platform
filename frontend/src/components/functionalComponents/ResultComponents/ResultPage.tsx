import { useLocation } from "react-router-dom";
import Header from "../../common/shared/Header/Header";
import ScoreResult from "./ScoreResult";
import TopicSectionDisplay from "./TopicSectionDisplay";
import ScoreItem from "../SpeechAnalysis/ScoreItem";
import BasePracticeApp from "../../common/PracticeApp/BasePracticeApp";
import ResultTitle from "./ResultTitle";
import MinimalistInfo from "./MinimalistInfo";
import { useSelector } from "react-redux";
import { useState } from "react";
import SliderParent from "../../common/shared/Slider/SliderParent";
import TopicDisplayTemplate from "./TopicDisplayTemplate";
import SpeechScores from "./components/SpeechScores";
import WrappedChartsComponent from "../../common/shared/Charts/Vocabulary/WrappedChartsComponent";


export default function ResultPage() {
    const location = useLocation();
    const {data} = location.state || {};
    const userData = useSelector(state => state.auth.userInfo)

    return(
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col gap-10 relative">
                <div>
                    <Header title="Quiz result for " coloredText={userData.user?.email} size="text-3xl" coloredClass="secondary-header-color" />
                </div>


                {data.speech_scores && (
                    <>
                    <SpeechScores language_scores={data.speech_scores.language_scores}/>
                    
                    <WrappedChartsComponent 
                        language_scores={data.speech_scores.language_scores}
                        />
                    </>
                   
                )}

                {data.quiz_scores && (
                    <div className="relative bg-slate-200 z-1 rounded-2xl p-5 py-14 mb-5">
                        <ResultTitle text="Quiz Exercise" />

                        <MinimalistInfo 
                            firstTitle="Score"
                            secondTitle="Time Duration"
                            firstValue={data.quiz_scores.total_score}
                            secondValue={data.quiz_scores.time_duration}
                        />


                        {!data.speech_scores && (
                            <ScoreResult
                                gradeLevel={data.quiz_scores.grade_info.grade}
                                gradeDescription={data.quiz_scores.grade_info.description}
                                totalScore={`${data.quiz_scores.total_score}/${data.quiz_scores.max_score}`}
                                />                    
                        )}

                        <TopicSectionDisplay
                            headerText="Information"
                            >
                            <ScoreItem title={"Max Score"} main_text={data.quiz_scores.max_score} description="Max achievable scores" />
                            <ScoreItem title={'Correct Answers'}  main_text={data.quiz_scores.correct_answers} info_text={'Correct answered'} description="Count of correct answers"/>
                            <ScoreItem title={'Incorrect Answers'}  main_text={data.quiz_scores.incorrect_answers} info_text={'Incorrect answered'} description="Count of incorrect answers"/>
                        </TopicSectionDisplay>
                    </div> 
                )}

            </div>
        </section>
        
    );
}