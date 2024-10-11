import {ReactMediaRecorder} from 'react-media-recorder';


// THIS IS JUST A DEMO HOW REACT MEDIA RECORDER WORKS

export default function MediaRecorder() {
    return(
        <ReactMediaRecorder

            audio
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (


                <div>
                    <p>{status}</p>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                    <video src={mediaBlobUrl} controls></video>
                </div>
            )}

        />
    );
}