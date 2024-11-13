import { useEffect, useState } from "react";
import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import Header from "../Header/Header";
import QuizFormTemplate from "./QuizFormTemplate";
import QuestionInterface from "../../../../types/Quiz/QuestionInterface";
import { getQuestions } from "../../../../services/Questions/getQuestions";
import { useLocation } from "react-router-dom";


export default function Quiz() {
    const location = useLocation();
    const { topicId } = location.state || {};
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await getQuestions(topicId);
                setQuestions(fetchedQuestions)
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        }

        loadQuestions();
    }, [topicId])


    return (
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col justify-center items-center relative">
                <Header title="Quiz " coloredText="Exercise" size="text-3xl" coloredClass="secondary-header-color" />

                {/* Form wrapping the question */}
                {questions.length > 0 && (
                    <QuizFormTemplate questions={questions} />
                )}
            </div>
    </section>

    );
}