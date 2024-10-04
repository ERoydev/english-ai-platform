import { useState } from "react";
import chapter1 from "./questions";
import Navigation from "../../../Navigation/Navigation";
import SpeakButton from "../../../shared/Button/speakButton";
import TimerComponent from "../../../shared/Timer/TimerComponent";


export default function IeltsSpeaking() {
    
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [recordButtonText, setRecordButtonText] = useState('Start Record');
    const [pauseTimer, setPauseTimer] = useState(false);

    const recordButtonHandler = () => {

        if (recordButtonText === "Pause") {
            setRecordButtonText(() => {
                return "Continue Recording";
            })

            handleStartPauseClick();

        } else {
            setRecordButtonText(() => {
                return "Pause";
            })

            handleStartPauseClick();

        }
    }

    const nextButtonHandler = () => {
        const currChapterLength = chapter1[currentChapterIndex].questions.length - 1
        const countOfTotalChapters = chapter1.length - 1;
        
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

    const handleStartPauseClick = () => {
        setPauseTimer((prev) => !prev); // Toggle between start and pause
    };


    return(
        <section className="h-screen flex flex-col relative max-container">
            <div className="flex-shrink-0">
                <Navigation />
            </div>

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

                    {/* BUTTONS */}
                    <div className="flex justify-between items-center absolute bottom-10 left-0 right-0 px-5">
                        
                        <div className="w-1/3 flex justify-start items-center">
                            <SpeakButton buttonText={recordButtonText} buttonHandler={recordButtonHandler} />
                        </div>

                        <div className="w-1/3 flex justify-center items-center">
                            <TimerComponent pauseTimer={pauseTimer} />
                        </div>

                        <div className="w-1/3 flex justify-end items-center">
                            <button
                                onClick={nextButtonHandler}
                                className="bg-[#333] rounded-md text-white p-4 max-md:text-sm max-md:p-2 hover:cursor-pointer hover:bg-gray-600">
                                <svg
                                    className="w-[30px] fill-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}