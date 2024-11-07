import { useEffect, useState } from "react";
import Header from "../../../shared/Header/Header";
import BasePracticeApp from "../../BasePracticeApp";
import { fetchVocabularyQuestions } from "../../../../../services/Vocabulary/VacubalaryService";
import AnswerItem from "../../../shared/Quiz/Components/AnwerItem";
import Button from "../../../shared/Button/Button";
import QuizFormTemplate from "../../../shared/Quiz/QuizFormTemplate";


export default function MultipleChoiceQuestion() {
    const CATEGORY = 'MCQ';
    const DIFFICULTY = null;

    return (
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col justify-center items-center">
                <Header title="Multiple Choice " coloredText="Questions" size="text-3xl" coloredClass="secondary-header-color" />

                {/* Form wrapping the questions */}
                <QuizFormTemplate QUESTIONCATEGORY={CATEGORY} QUESTIONDIFFICULTY={DIFFICULTY} />
            </div>
        </section>
    );
}
