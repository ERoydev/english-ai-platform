import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../common/shared/Header/Header';
import ScoreItem from './ScoreItem';
import ScoreResult from '../ResultComponents/ScoreResult';
import TopicSectionDisplay from '../ResultComponents/TopicSectionDisplay';

const SpeechAnalysis: React.FC = () => {
  const location = useLocation();
  const { audioBlob, analysis } = location.state || {};

  console.log(analysis)

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

      <ScoreResult 
        gradeLevel={analysis.language_scores.grade.grade}
        gradeDescription={analysis.language_scores.grade.description}
        totalScore={analysis.language_scores.total_score}
      />

      <TopicSectionDisplay headerText={'Vocabulary'}>
        <ScoreItem title={'Unique Words'} main_text={analysis.language_scores.unique_words} info_text='words' description='words that are used only once'/>
        <ScoreItem title={'Score'} main_text={analysis.language_scores.vocabulary_stats.score} description='Score for vocabulary specific' />
        <ScoreItem title={'Level'} main_text={analysis.language_scores.vocabulary_stats.level} description='Level for vocabulary'/>
        <ScoreItem title={'Grammar Score'} main_text={analysis.language_scores.vocabulary_stats.lexical_diversity} description='How much of speech use unique words' percentage={true} />
      </TopicSectionDisplay>

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
