import { useState } from "react";
import AnswerItem from "./Components/AnwerItem";
import Button from "../Button/Button";
import QuestionInterface from "../../../../types/Quiz/QuestionInterface";


interface AnswerDataInterface {
    [questionId: number]: string;
}

export default function QuizFormTemplate({
    questions,
}: {
    questions: QuestionInterface[];
}) {
    const [selectedAnswers, setSelectedAnswers] = useState<AnswerDataInterface>({}); // Track selected answers by question ID
    const [validationErrors, setValidationErrors] = useState<AnswerDataInterface>({});


    // useEffect(() => {
    //     const loadQuestions = async () => {
    //         try {
    //             const fetchedQuestions = await fetchVocabularyQuestions(QUESTIONCATEGORY, QUESTIONDIFFICULTY);
    //             setQuestions(fetchedQuestions);
    //         } catch (error) {
    //             console.error("Error fetching question:", error);
    //         }
    //     };

    //     loadQuestions();
    // }, []);

    const handleAnswerSelect = (questionId: number, answerId: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answerId,
        }));

        setValidationErrors((prevErrors) => {
            const { [questionId]: removedError, ...remainingErrors } = prevErrors;
            return remainingErrors;
        });
    };

    const handleSubmit = (event: Event) => {
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
            console.log("Selected answers:", selectedAnswers);
            // Add API call or form submission logic here
        }
    };

    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-20">
            {questions && questions.map((question, questionIndex) => (
                <div key={question.id} className="flex flex-col gap-2 lg:w-[700px]">
                    <h1 className="text-lg pb-5 text-gray-800">
                        <span className="text-yellow-600">{questionIndex + 1}.</span> {question.question_text}
                    </h1>

                    {question.choices !== null && question.choices.map((choice, index) => (
                        <AnswerItem
                            key={index}
                            text={choice}
                            id={`${question.id}-${index}`}
                            isSelected={selectedAnswers[question.id] === `${question.id}-${index}`}
                            onSelect={() => handleAnswerSelect(question.id, `${question.id}-${index}`)}
                        />
                    ))}

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

    );
}