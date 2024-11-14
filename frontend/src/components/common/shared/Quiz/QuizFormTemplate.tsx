import { useEffect, useState } from "react";
import AnswerItem from "./Components/AnwerItem";
import Button from "../Button/Button";
import QuestionInterface from "../../../../types/Quiz/QuestionInterface";
import TimerComponent from "../Timer/TimerComponent";
import { submitQuestions } from "../../../../services/Questions/submitQuestions";
import AnswerDataInterface from "../../../../types/Quiz/AnswerDataInterface";
import logger from "../../../../logger";
import { useNavigate } from "react-router-dom";
import Path from "../../../../Paths";
import MediaRecorder from "../../../functionalComponents/RecordingComponent/MediaRecorder";
import RecordingComponent from "../../../functionalComponents/RecordingComponent/RecordingComponent";

export default function QuizFormTemplate({
    questions,
}: {
    questions: QuestionInterface[];
}) {
    const [selectedAnswers, setSelectedAnswers] = useState<AnswerDataInterface>({}); // Track selected answers by question ID
    const [validationErrors, setValidationErrors] = useState<AnswerDataInterface>({});
    const [finalTime, setFinalTime] = useState({minutes: 0, seconds: 0});
    const navigate = useNavigate();

    // Handles Timer 
    const [isFinished, setIsFinished] = useState(false);
    const [runTimer, setRunTimer] = useState(true);
    
    const handleTimeEnd = (minutes, seconds) => {
        // finalTime holds the minutes and seconds that this quiz took
        setFinalTime({minutes, seconds})
    }

    const handleAnswerSelect = (questionId: number, answer: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answer,
        }));

        setValidationErrors((prevErrors) => {
            const { [questionId]: removedError, ...remainingErrors } = prevErrors;
            return remainingErrors;
        });
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        // Validate if all question have been answered
        const newValidationErrors: AnswerDataInterface = {};
        questions.forEach((question) => {
            if (!selectedAnswers[question.id]) {
                newValidationErrors[question.id] = "Please select an answer.";
            }
        });

        if (Object.keys(newValidationErrors).length > 0) {
            // If there are validation errors, update state and prevent submission
            setValidationErrors(newValidationErrors);
            
        } else {
            // If no validation errors, proceed with form submission
            // Stop the timer and recieve the finalTime state
            setIsFinished(true);
            setRunTimer(false);
        }
    };

    useEffect(() => {
        if (isFinished && finalTime !== null) {
            (async () => {
                try {
                    const response = await submitQuestions(selectedAnswers, finalTime);
                    navigate(Path.Practice.QuizResult, { state: { data: response } });
                } catch (error) {
                    logger.error('Error while submitting:', error);
                }
            })();
        }
    }, [isFinished, finalTime, selectedAnswers, navigate])

    return(
        <div>
            <div className="fixed bottom-1 right-5 p-4">
                <TimerComponent isFinished={isFinished} pauseTimer={runTimer} isTimerStarting={true} onTimeEnd={handleTimeEnd} />
            </div>
     
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-20 relative">
                {questions && questions.map((question, questionIndex) => (
                    <div key={question.id} className="flex flex-col gap-2 lg:w-[700px]">
                        <h1 className="text-lg pb-5 text-gray-800">
                            <span className="text-yellow-600">{questionIndex + 1}.</span> {question.question_text}
                        </h1>

                        {question.choices && question.choices.map((choice, index) => (
                            <AnswerItem
                                key={index}
                                text={choice}
                                id={`${question.id}-${index}`}
                                isSelected={selectedAnswers[question.id] === `${choice}`}
                                onSelect={() => handleAnswerSelect(question.id, `${choice}`)}
                            />
                        ))}

                        {!question.choices && (
                            <div>
                                <MediaRecorder />
                            </div>
                        )}

                        {/* Display validation error for the question if not answered */}
                        {validationErrors[question.id] && (
                            <p className="text-red-500 text-sm">{validationErrors[question.id]}</p>
                        )}

                        {/* Optional hidden input to simulate form field for each question */}
                        <input
                            type="hidden"
                            name={`question_${question.id}`}
                            value={selectedAnswers[question.id] || ""}
                        />
                    </div>
                ))}
                
                {/* Submit button */}
                <div className="pb-10">
                    <Button label="Submit" />
                </div>
            </form>

        </div>
    );
}