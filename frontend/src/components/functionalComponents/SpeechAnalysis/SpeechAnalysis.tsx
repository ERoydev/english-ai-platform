import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../common/shared/Header/Header';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const { audioBlob, analysis } = location.state || {};

  return (
    <div className="max-container">
      <Header title="IELTS Basic" size="text-2xl" customClass="mb-2 font-bold" />
      <p>Words: {analysis?.basic_text_analyzer.word_count_analyzer}</p>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg">
          <div className="flex flex-col items-center w-full">
            <audio
              controls
              src={audioBlob}
              className="w-full border border-gray-300 rounded-lg shadow-sm"
            >
              Your browser does not support the audio element.
            </audio>
            <p className="text-sm text-gray-500 mt-2 text-center">Play your recorded audio.</p>
          </div>
        </div>

 
    </div>
  );
};

export default SpeechAnalysis;
