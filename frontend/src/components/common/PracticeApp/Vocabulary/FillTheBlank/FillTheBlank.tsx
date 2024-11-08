import Quiz from "../../../shared/Quiz/Quiz";

export default function FillTheBlank() {
    const CATEGORY = 'FILL';
    const DIFFICULTY = null;

    return (
        <Quiz
            CATEGORY={CATEGORY} 
            DIFFICULTY={DIFFICULTY} 
            HeaderText="Fill In The "
            ColoredText="Blank"
        />
    );
}