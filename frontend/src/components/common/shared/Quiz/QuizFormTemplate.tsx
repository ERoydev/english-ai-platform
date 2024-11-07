import { useEffect, useState } from "react";
import { fetchVocabularyQuestions } from "../../../../services/Vocabulary/VacubalaryService";
import AnswerItem from "./Components/AnwerItem";
import Button from "../Button/Button";

interface Question {
    id: number;
    question_text: string;
    difficulty: number;
    answer: string;
    choices: string[];
}

interface SelectedAnswers {
    [questionId: number]: string;
}

export default function QuizFormTemplate({
    QUESTIONCATEGORY,
    QUESTIONDIFFICULTY,
}: {
    QUESTIONCATEGORY: string;
    QUESTIONDIFFICULTY: string | null;
}) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({}); // Track selected answers by question ID

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchVocabularyQuestions(QUESTIONCATEGORY, QUESTIONDIFFICULTY);
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        loadQuestions();
    }, []);

    const handleAnswerSelect = (questionId: number, answerId: string) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        // Here you can handle the selected answers, e.g., sending to an API
        console.log("Selected answers:", selectedAnswers);
        // Add API call or form submission logic here
    };

    console.log(questions)

    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-20">
            {questions && questions.map((question, questionIndex) => (
                <div key={question.id} className="flex flex-col gap-2 lg:w-[700px]">
                    <h1 className="text-lg pb-5 text-gray-800">
                        <span className="text-yellow-600">{questionIndex + 1}.</span> {question.question_text}
                    </h1>

                    {question.choices.map((choice, index) => (
                        <AnswerItem
                            key={index}
                            text={choice}
                            id={`${question.id}-${index}`}
                            isSelected={selectedAnswers[question.id] === `${question.id}-${index}`}
                            onSelect={() => handleAnswerSelect(question.id, `${question.id}-${index}`)}
                        />
                    ))}

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