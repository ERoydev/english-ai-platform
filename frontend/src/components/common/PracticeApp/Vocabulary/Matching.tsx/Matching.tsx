import Quiz from "../../../shared/Quiz/Quiz";

export default function Matching() {
    const CATEGORY = 'MATCH';
    const DIFFICULTY = null;

    return (
        <Quiz
            CATEGORY={CATEGORY} 
            DIFFICULTY={DIFFICULTY} 
            HeaderText="Synonym/Antonym "
            ColoredText="Matching"
        />
    );
}