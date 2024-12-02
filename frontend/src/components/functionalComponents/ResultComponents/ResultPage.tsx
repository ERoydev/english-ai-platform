import { useLocation } from "react-router-dom";
import Header from "../../common/shared/Header/Header";
import ScoreResult from "./ScoreResult";
import TopicSectionDisplay from "./TopicSectionDisplay";
import ScoreItem from "../SpeechAnalysis/ScoreItem";
import BasePracticeApp from "../../common/PracticeApp/BasePracticeApp";
import ResultTitle from "./ResultTitle";
import MinimalistInfo from "./MinimalistInfo";
import { useSelector } from "react-redux";


export default function ResultPage() {
    const location = useLocation();
    const {data} = location.state || {};
    const userData = useSelector(state => state.auth.userInfo)

    return(
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col gap-10 relative">
                <div>
                    <Header title="Quiz result for " coloredText={userData.user.email} size="text-3xl" coloredClass="secondary-header-color" />
                </div>



                {data.speech_scores && (
                    
                    <div className="relative bg-blue-300 z-1 rounded-lg p-5 mb-5">
                        <ResultTitle text="Speaking Exercise" />
                    
                        <ScoreResult
                            gradeLevel={data.speech_scores.language_scores.grade.grade}
                            gradeDescription={data.speech_scores.language_scores.grade.description}
                            totalScore={`${data.speech_scores.language_scores.total_score}`}
                        />
                
                        <TopicSectionDisplay headerText={'Vocabulary'}>
                            <ScoreItem title={'Unique Words'} main_text={data.speech_scores.language_scores.unique_words} info_text='words' description='words that are used only once'/>
                            <ScoreItem title={'Comprehension Score'} main_text={data.speech_scores.language_scores.readability_score} description='how much of speech is comprehensive' percentage={true} />
                            <ScoreItem title={'Sentence Score'} main_text={data.speech_scores.language_scores.sentence_structure_score} description='how good sentences are structured' percentage={true}/>
                            <ScoreItem title={'Grammar Score'} main_text={data.speech_scores.language_scores.grammar_score} description='the words you use' percentage={true}/>
                        </TopicSectionDisplay>
                    </div> 
                )}

                {data.quiz_scores && (
                    <div className="relative bg-blue-300 z-1 rounded-lg p-5 py-14 mb-5">
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