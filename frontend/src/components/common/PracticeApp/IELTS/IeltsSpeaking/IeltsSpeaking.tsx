import { useState } from "react";
import chapter1 from "./questions";
import Navigation from "../../../Navigation/Navigation";
import RecordingComponent from "../../../../functionalComponents/RecordingComponent/RecordingComponent";
import { useRecordingChangeQuestions } from "../../../../functionalComponents/RecordingComponent/useRecordingChangeQuestions";
import InteractiveLoader from "../../../Loader/InteractiveLoader";


export default function IeltsSpeaking() {
    const { currentChapterIndex, currentQuestionIndex, nextButtonHandler, isFinished} = useRecordingChangeQuestions(chapter1)
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    }

    const stopLoading = () => {
        setIsLoading(false);
    }
    

    return(
        <section className="h-screen flex flex-col relative max-container">
            <div className="flex-shrink-0">
                <Navigation />
            </div>

            {!isLoading && (
                <InteractiveLoader />
            )}

        </section>

    );
}