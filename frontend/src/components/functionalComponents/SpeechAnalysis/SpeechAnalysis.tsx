import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../common/shared/Header/Header';
import ScoreResult from '../ResultComponents/ScoreResult';
import logger from '../../../logger';
import SpeechScores from '../ResultComponents/components/SpeechScores';
import LevelRadar from '../../common/shared/Charts/LevelRadar';
import TinyBarChart from '../../common/shared/Charts/TinyBarChart';
import ResultTitle from '../ResultComponents/ResultTitle';
import VocabularyChart from '../../common/shared/Charts/Vocabulary/PieChartVocabulary';
import PieChartVocabulary from '../../common/shared/Charts/Vocabulary/PieChartVocabulary';
import UsedWordsDisplay from '../ResultComponents/components/UsedWordsDisplay';
import WrappedChartsComponent from '../../common/shared/Charts/Vocabulary/WrappedChartsComponent';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const { audioBlob, analysis } = location.state || {};


  return (
    <div className="py-16 px-20 max-md:px-5 flex flex-col gap-16">

      <div className='flex flex-col gap-2'>

        <Header title="IELTS Basic" size="text-2xl" customClass="mb-2 font-bold" />

        <div className="flex gap-5 mb-7">
          <p className='text-md'>
            <span className='text-gray-500 font-semibold'>Words:</span> <span className='font-bold text-md'>{analysis.analysis_result.basic_text_analyzer.word_count_analyzer}</span>
          </p>

          <p className='text-md'>
            <span className='text-gray-500 font-semibold'>Duration:</span> <span className='font-bold text-md'>{analysis?.audio_duration}</span>
          </p>
        </div>

        <div className=''>
          <SpeechScores 
            language_scores={analysis.language_scores}
            />
        </div>
      </div>
      
      <WrappedChartsComponent 
        language_scores={analysis.language_scores}
      />

      {/* Listen Media File */}
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
