import React, { useEffect, useState } from 'react';
import TimerComponent from '../../common/shared/Timer/TimerComponent';
import SpeakButton from '../../common/shared/Button/SpeakButton';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useNavigate } from 'react-router-dom';
import Path from '../../../Paths';

interface RecordingComponentProps {
  nextButtonHandler: () => void;
  isFinished: boolean;
}

const RecordingComponent: React.FC<RecordingComponentProps> = ({
  nextButtonHandler,
  isFinished,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordButtonText, setRecordButtonText] = useState('Start Record');
  const [startTimer, setStartTimer] = useState(false);

  const { startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
    
  const navigate = useNavigate();

  const handleRecordButtonClick = () => {
    if (!isRecording) {
      // Start recording
      startRecording();
      setRecordButtonText('Pause');
      setIsRecording(true);
      setStartTimer(true);
    } else if (!isPaused) {
      // Pause recording
      pauseRecording();
      setRecordButtonText('Resume');
      setIsPaused(true);
      setStartTimer(false);
    } else {
      // Resume recording
      resumeRecording();
      setRecordButtonText('Pause');
      setIsPaused(false);
      setStartTimer(true);
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    stopRecording();
    setRecordButtonText('Start Record');
    setIsRecording(false);
    setIsPaused(false);
    setStartTimer(false);
  };

  // Automatically stop recording and navigate when isFinished becomes true
  useEffect(() => {
    if (isFinished) {
      handleStopRecording();
    }
  }, [isFinished]);

  useEffect(() => {
    // Navigate to the Speech Analysis page when mediaBlobUrl is available after recording stops
    if (mediaBlobUrl && isFinished) {
      navigate(Path.SpeechAnalysis, { state: { audioBlob: mediaBlobUrl } });
    }
  }, [mediaBlobUrl, isFinished, navigate]);

  return (
    <div className="flex justify-between items-center absolute bottom-10 left-0 right-0 px-5">
     
      <div className="w-1/3 flex justify-start items-center">
        <SpeakButton
          buttonText={recordButtonText}
          buttonHandler={handleRecordButtonClick}
          />
      </div>

      <div className="w-1/3 flex justify-center items-center">
        <TimerComponent pauseTimer={startTimer} />
      </div>
    

      <div className="w-1/3 flex justify-end items-center">
        <button
          onClick={() => {
            if (!isFinished) {
              nextButtonHandler();
            }
          }}
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
              <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5 12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecordingComponent;
