import { useReactMediaRecorder} from 'react-media-recorder';


// THIS IS JUST A DEMO HOW REACT MEDIA RECORDER WORKS

export default function MediaRecorder() {

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({audio: true})

    return(
        <div className='flex flex-col gap-5'>
                <video src={mediaBlobUrl} controls></video>

            <div className='flex gap-5'>
                <button 
                    type='button'
                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={startRecording}>Start Recording
                </button>

                <button 
                    type='button'
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={stopRecording}>Stop Recording
                </button>
            </div>
            
          

        </div>
    );
}