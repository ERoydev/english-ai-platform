import React, { useState } from 'react';
import TimerComponent from '../../common/shared/Timer/TimerComponent';
import SpeakButton from '../../common/shared/Button/SpeakButton';

/*
This component handles the Timer, Speaking and question changing this is coupled with custom hook to be reused accross different places
*/
function RecordingComponent({
  nextButtonHandler // Initialized in useRecordingChangeQuestions custom hook
}:{
  nextButtonHandler: () => void, // Function to call when the next button is clicked
}) {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [allRecordings, setAllRecordings] = useState([]);
  const [recordButtonText, setRecordButtonText] = useState('Start Record');
  const [pauseTimer, setPauseTimer] = useState(false);


  let mediaRecorder;

  const startRecording = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAllRecordings((prevRecordings) => [...prevRecordings, audioBlob]);
          setAudioChunks([]); // Reset audio chunks
        };
      })
      .catch(error => {
        console.error("Error accessing the microphone: ", error);
      });
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleStartPauseClick = () => {
      setPauseTimer((prev) => !prev); // Toggle between start and pause
  };

  const recordButtonHandler = () => {

    if (recordButtonText === "Pause") {
        setRecordButtonText(() => {
            return "Continue";
        })

        handleStartPauseClick();

    } else {
        setRecordButtonText(() => {
            return "Pause";
        })

        handleStartPauseClick();

    }
}

  const finishTest = () => {
    // Prepare data to send for analysis
    console.log('FINISH')
    // const formData = new FormData();
    // allRecordings.forEach((recording, index) => {
    //   formData.append(`audio_${index}`, recording, `recording_${index}.wav`);
    // });

    // axios.post('http://your-backend-url/api/analyze/', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then(response => {
    //   console.log("Analysis results: ", response.data);
    //   // Reset all recordings after analysis
    //   setAllRecordings([]);
    // })
    // .catch(error => {
    //   console.error("Error during analysis: ", error);
    // });
  };

  return (
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
  );
}

export default RecordingComponent;
