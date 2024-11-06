import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../common/shared/Header/Header';
import ScoreItem from './ScoreItem';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const { audioBlob, analysis } = location.state || {};

  return (
    <div className="py-16 px-20">
      <Header title="IELTS Basic" size="text-2xl" customClass="mb-2 font-bold" />

      <div className="flex gap-5">
        <p className='text-md'>
          <span className='text-gray-500 font-semibold'>Words:</span> <span className='font-bold text-md'>{analysis.analysis_result.basic_text_analyzer.word_count_analyzer}</span>
        </p>

        <p className='text-md'>
          <span className='text-gray-500 font-semibold'>Duration:</span> <span className='font-bold text-md'>{analysis?.audio_duration}</span>
        </p>
      </div>


      <div className='border-2 border-gray-500 window px-10 py-14 my-10 flex gap-10 items-center'>

        <div className='flex flex-col gap-3'>
          <p className='text-md font-bold'>Scores</p>
          <h1 className='font-bold text-2xl text-gray-700'>Level: {analysis.language_scores.grade.grade}</h1>
          <p className='text-gray-800'>{analysis.language_scores.grade.description}</p>
        </div>

        <div className='bg-blue-500 p-5 rounded-lg aspect-square flex items-center'>
          <h1 className='text-4xl font-bold text-white'>{analysis.language_scores.total_score}</h1>
        </div>
      </div>

      <div className='bg-gray-200 px-14 py-14 mb-20 rounded-xl'>
        <Header title="Vocabulary" size="text-2xl" customClass="mb-8 font-bold" />

        <div className='flex gap-28'>
          <ScoreItem title={'Unique Words'} main_text={analysis.language_scores.unique_words} info_text='words' description='words that are used only once'/>
          <ScoreItem title={'Comprehension Score'} main_text={analysis.language_scores.readability_score} description='how much of speech is comprehensive' percentage={true} />
          <ScoreItem title={'Sentence Score'} main_text={analysis.language_scores.sentence_structure_score} description='how good sentences are structured' percentage={true}/>
          <ScoreItem title={'Grammar Score'} main_text={analysis.language_scores.grammar_score} description='the words you use' percentage={true}/>
        </div>
      </div>

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
