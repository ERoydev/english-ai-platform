import React from 'react';
import { useLocation } from 'react-router-dom';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const audioBlob = location.state?.audioBlob; // Access the audio blob URL from state

  return (
    <div>
      <h1>Speech Analysis</h1>
      {audioBlob ? (
        <div>
          <audio controls src={audioBlob}>
            Your browser does not support the audio element.
          </audio>
          <p>Play your recorded audio.</p>
        </div>
      ) : (
        <p>No audio available. Please record something first.</p>
      )}
    </div>
  );
};

export default SpeechAnalysis;
