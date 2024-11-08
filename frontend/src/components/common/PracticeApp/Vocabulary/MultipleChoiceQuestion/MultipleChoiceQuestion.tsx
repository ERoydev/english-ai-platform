import Quiz from "../../../shared/Quiz/Quiz";

export default function MultipleChoiceQuestion() {
    const CATEGORY = 'MCQ';
    const DIFFICULTY = null;

    return (
        <Quiz
            CATEGORY={CATEGORY} 
            DIFFICULTY={DIFFICULTY} 
            HeaderText="Multiple Choice "
            ColoredText="Questions"
        />
    );
}
