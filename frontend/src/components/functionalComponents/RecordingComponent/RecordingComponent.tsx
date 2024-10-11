import React, { useState } from 'react';
import TimerComponent from '../../common/shared/Timer/TimerComponent';
import SpeakButton from '../../common/shared/Button/SpeakButton';
import { ReactMediaRecorder } from 'react-media-recorder';

/*
This component handles the Timer, Speaking, and question changing.
It is coupled with a custom hook to be reused across different places.
*/
interface RecordingComponentProps {
  nextButtonHandler: () => void; // Function for handling the next button click
  isFinished: boolean; // Boolean indicating whether all questions are completed
}

const RecordingComponent: React.FC<RecordingComponentProps> = ({
  nextButtonHandler,
  isFinished,
}) => {
  const [isRecording, setIsRecording] = useState(false); // For controlling recording state
  const [isPaused, setIsPaused] = useState(false); // For controlling pause/resume state
  const [recordButtonText, setRecordButtonText] = useState('Start Record');
  const [startTimer, setStartTimer] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null); // Store the audio URL for download

  const handleRecordButtonClick = (
    startRecording: () => void,
    pauseRecording: () => void,
    resumeRecording: () => void,
    stopRecording: () => void
  ) => {
    if (!isRecording) {
      // Start Recording
      startRecording();
      setRecordButtonText('Pause');
      setIsRecording(true);
      setStartTimer(true); // Start timer when recording begins
    } else if (!isPaused) {
      // Pause the recording
      pauseRecording();
      setRecordButtonText('Resume');
      setIsPaused(true);
      setStartTimer(false); // Pause timer when recording is paused
    } else {
      // Resume the recording
      resumeRecording();
      setRecordButtonText('Pause');
      setIsPaused(false);
      setStartTimer(true); // Resume timer when recording resumes
    }
  };

  const handleStopRecording = (stopRecording: () => void) => {
    stopRecording();
    setRecordButtonText('Start Record');
    setIsRecording(false);
    setIsPaused(false);
    setStartTimer(false); // Stop timer when recording stops
  };

  const handleNextButton = (stopRecording: () => void) => {
    if (isFinished) {
      // Stop Recording and get the final blob
      handleStopRecording(stopRecording);
    } else {
      nextButtonHandler();
    }
  };

  return (
    <ReactMediaRecorder
      audio
      render={({ startRecording, pauseRecording, resumeRecording, stopRecording, mediaBlobUrl }) => {
        if (mediaBlobUrl && !audioURL) {
          setAudioURL(mediaBlobUrl); // Set the audio URL when the recording is finished
        }

        return (
          <div className="flex justify-between items-center absolute bottom-10 left-0 right-0 px-5">
            <div className="w-1/3 flex justify-start items-center">
              <SpeakButton
                buttonText={recordButtonText}
                buttonHandler={() =>
                  handleRecordButtonClick(startRecording, pauseRecording, resumeRecording, stopRecording)
                }
              />
            </div>

            <div className="w-1/3 flex justify-center items-center">
              <TimerComponent pauseTimer={startTimer} />
            </div>

            <div className="w-1/3 flex justify-end items-center">
              <button
                onClick={() => handleNextButton(stopRecording)}
                className="bg-[#333] rounded-md text-white p-4 max-md:text-sm max-md:p-2 hover:cursor-pointer hover:bg-gray-600"
              >
                {isFinished ? (
                  <span className="font-bold">Done</span>
                ) : (
                  <svg
                    className="w-[30px] fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Display download link if the audio is available */}
            {/* {audioURL && (
              <div className="absolute top-5 right-5">
                <a
                  href={audioURL}
                  download="recording.mp3"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Download Recording
                </a>
              </div>
            )} */}
          </div>
        );
      }}
    />
  );
};

export default RecordingComponent;
