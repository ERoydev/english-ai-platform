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

            {isLoading && (
                <div>
                    <InteractiveLoader />
                </div>
            )}

            {!isLoading && (
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full px-5 py-14 text-center">
                        {/* Question */}
                        <div className="mb-52">
                            <h1 className="font-semibold info-text text-lg mb-10">
                                {chapter1[currentChapterIndex].title}
                            </h1>
                            <p className=" font-bold text-3xl">
                                {chapter1[currentChapterIndex].questions[currentQuestionIndex]}
                            </p>

                            <p className="text-sm text-slate-400">The longer you talk the better</p>
                        </div>
                        {/* Recording Component with timer and FN from my custom hook is used here  */}
                        <RecordingComponent nextButtonHandler={nextButtonHandler} isFinished={isFinished} startLoading={startLoading} stopLoading={stopLoading}/>
                    </div>
                </div>
            )}
      

        </section>

    );
}