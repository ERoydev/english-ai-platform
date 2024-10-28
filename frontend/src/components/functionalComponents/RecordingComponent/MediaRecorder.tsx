import { useReactMediaRecorder} from 'react-media-recorder';


// THIS IS JUST A DEMO HOW REACT MEDIA RECORDER WORKS

export default function MediaRecorder() {

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({audio: true})

    return(
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls></video>
        </div>
    );
}