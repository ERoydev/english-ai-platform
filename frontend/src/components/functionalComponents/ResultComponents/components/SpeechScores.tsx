import SliderParent from "../../../common/shared/Slider/SliderParent";
import ResultTitle from "../ResultTitle";
import ScoreResult from "../ScoreResult";
import TopicDisplayTemplate from "../TopicDisplayTemplate";


export default function SpeechScores({
    language_scores
}) {
    return(
        <div className="relative bg-blue-200 z-1 rounded-lg p-5 mb-5">
            <ResultTitle text="Speaking Exercise" />
        
            <ScoreResult
                gradeLevel={language_scores.grade.grade}
                gradeDescription={language_scores.grade.description}
                totalScore={`${language_scores.total_score}`}
            />
            
            <SliderParent
                data={language_scores}
                Component={TopicDisplayTemplate}
                title={{
                    'vocabulary_stats': 'Vocabulary',
                    'grammar_stats': 'Grammar',
                    'fluency_stats': 'Fluency',
                    'pronunciation_stats': 'Pronunciation',
                    }
                }
                customClassNames={{
                    slide: 'py-0'
                }}
            />
        
        </div> 
    );
}