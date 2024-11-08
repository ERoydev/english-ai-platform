import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import Header from "../Header/Header";
import QuizFormTemplate from "./QuizFormTemplate";

export default function Quiz({
    CATEGORY,
    DIFFICULTY,
    HeaderText,
    ColoredText,
}: {
    CATEGORY: string;
    DIFFICULTY: string | null;
    HeaderText: string;
    ColoredText: string;
}) {
    return (
    <section>
        <BasePracticeApp />

        <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col justify-center items-center">
            <Header title={`${HeaderText} `} coloredText={ColoredText} size="text-3xl" coloredClass="secondary-header-color" />

            {/* Form wrapping the question */}
            <QuizFormTemplate QUESTIONCATEGORY={CATEGORY} QUESTIONDIFFICULTY={DIFFICULTY} />
        </div>
    </section>

    );
}