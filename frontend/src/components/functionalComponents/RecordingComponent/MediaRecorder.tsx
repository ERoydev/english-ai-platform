import { useEffect } from 'react';
import { useReactMediaRecorder} from 'react-media-recorder';

export default function MediaRecorder({
    handleMediaArray,
    confirmAnswer,
}: {
    handleMediaArray: (mediaBlobUrl: string) => void;  // This function is expected to handle the recorded media blob URL and perform necessary actions.
    confirmAnswer: () => void;  // This function is expected to trigger the confirmation action. To put in selectedAnswers that i have answered this to not trigger validation errors
}) {

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({audio: true})


    useEffect(() => {
        if (status == 'stopped') {
            confirmAnswer();  // Call the confirmAnswer function when the recording is stopped.
            handleMediaArray(mediaBlobUrl);
        }
    }, [status])

    return(
        <div className='flex flex-col gap-5'>
                <video src={mediaBlobUrl} controls></video>

           
            <div className='flex gap-5'>
                {status == 'idle' && (
                    <button 
                        type='button'
                        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={startRecording}>Start Recording
                    </button>
                    
                )}

                {status == 'recording' && (
                    <button 
                        type='button'
                        className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={stopRecording}>Stop Recording
                    </button>

                )}

                {status == 'stopped' && (
                    <h1 className='py-2 px-5 bg-slate-200 rounded-md font-semibold text-red-800'>Question is answered!</h1>

                )}
            </div>
            
          

        </div>
    );
}