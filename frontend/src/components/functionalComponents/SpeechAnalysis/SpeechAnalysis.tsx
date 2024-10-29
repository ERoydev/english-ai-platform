import React from 'react';
import { useLocation } from 'react-router-dom';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const audioBlob = location.state?.audioBlob; // Access the audio blob URL from state

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Speech Analysis</h1>
      {audioBlob ? (
        <div className="w-full flex flex-col items-center">
          <audio
            controls
            src={audioBlob}
            className="w-full max-w-xs border border-gray-300 rounded-lg shadow-sm"
          >
            Your browser does not support the audio element.
          </audio>
          <p className="text-sm text-gray-500 mt-2">Play your recorded audio.</p>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No audio available. Please record something first.
        </p>
      )}
  </div>

  );
};

export default SpeechAnalysis;
