import UsedWordsDisplay from "../../../../functionalComponents/ResultComponents/components/UsedWordsDisplay";
import PieChartVocabulary from "./PieChartVocabulary";

export default function WrappedChartsComponent({
    language_scores
}) {
    return(
        <div className='flex max-lg:flex-col gap-10 mb-32'>
        
            <div className='w-[50%] max-lg:w-full'>
                <PieChartVocabulary 
                classified_words={language_scores.vocabulary_stats.advanced_word_usage.classified_words}
                />
            </div>

            <div className='w-[50%] max-lg:w-full'>
                <UsedWordsDisplay classified_words={language_scores.vocabulary_stats.advanced_word_usage.classified_words} />
            </div>
        </div>
    );
}