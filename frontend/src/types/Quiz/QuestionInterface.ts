
export default interface QuestionInterface {
    id: number;
    question_text: string;
    difficulty: number;
    media_prompt?: string; // Because its optional which question i want to have Video or not
    choices?: string[]; // OpenEnded questions do not have choices or correct answer
    correct_answer?: string;  // Some questions do not have correct answer
    category_id: number; // Specify which category is this in
}
