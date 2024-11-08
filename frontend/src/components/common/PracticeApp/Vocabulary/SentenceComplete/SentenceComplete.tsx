import Quiz from "../../../shared/Quiz/Quiz";

export default function SentenceComplete() {
    const CATEGORY = 'COMPLETE';
    const DIFFICULTY = null;

    return (
        <Quiz
            CATEGORY={CATEGORY} 
            DIFFICULTY={DIFFICULTY} 
            HeaderText="Complete The "
            ColoredText="Sentence"
        />
    )
}