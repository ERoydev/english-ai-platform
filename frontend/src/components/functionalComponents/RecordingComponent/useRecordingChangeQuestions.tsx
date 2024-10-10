/*
This custom hook is responsible for Question change logic when Next button is clicked in Recording Component.
*/

import { useState } from "react";

interface Chapter {
    title: string;
    questions: string[];
}


export const useRecordingChangeQuestions = (chapter: Chapter[]) => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const nextButtonHandler = () => {
        // Chapter means chapter with multiple questions inside.
        // "First Chapter": ["question1", "question2", ...]

        const currChapterLength = chapter[currentChapterIndex].questions.length - 1
        const countOfTotalChapters = chapter.length - 1;

        
        if (currentChapterIndex == countOfTotalChapters && currentQuestionIndex == currChapterLength ) {
            return
        }
       
        if (currentQuestionIndex < currChapterLength) {
            setCurrentQuestionIndex((idx) => {
                return idx + 1
            })
        } else {
            setCurrentChapterIndex((idx) => {
                return idx + 1
            })

            setCurrentQuestionIndex(() => {
                return 0
            })
        }
    }

    return {
        currentChapterIndex,
        currentQuestionIndex,
        nextButtonHandler,
    }
}
