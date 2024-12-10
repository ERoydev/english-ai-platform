import ScoreItem from "../SpeechAnalysis/ScoreItem";
import TopicSectionDisplay from "./TopicSectionDisplay";

export default function TopicDisplayTemplate({
    name,
    title,
    data
}:{
    title: string,
    name: string,
    key: string,
}) {

    return(
        <div>
            <TopicSectionDisplay key={name} headerText={title}>
                {data && Object.entries(data).map(([key, value]) => (
                    <ScoreItem key={key} title={key} main_text={value.score} description={value.description} />
                ))}
            
            
                {/* <ScoreItem title={'Unique Words'} main_text={data.speech_scores.language_scores.unique_words} info_text='words' description='words that are used only once'/>
                <ScoreItem title={'Score'} main_text={data.speech_scores.language_scores.vocabulary_stats.score} description='Score for vocabulary specific' />
                <ScoreItem title={'Level'} main_text={data.speech_scores.language_scores.vocabulary_stats.level} description='Level for vocabulary'/>
                <ScoreItem title={'Grammar Score'} main_text={data.speech_scores.language_scores.vocabulary_stats.lexical_diversity} description='How much of speech use unique words' percentage={true} /> */}
            </TopicSectionDisplay>

            {/* <TopicSectionDisplay key={1} headerText={'Fluency'}>
                <ScoreItem title={'Words per sec'} main_text={data.speech_scores.language_scores.fluency_stats.words_per_second} description='Count of words per second' />
                <ScoreItem title={'Score'} main_text={data.speech_scores.language_scores.fluency_stats.words_per_second} description='Words per second' />
                <ScoreItem title={'Level'} main_text={data.speech_scores.language_scores.fluency_stats.level} description='Level for fluency'/>
            </TopicSectionDisplay>

            <TopicSectionDisplay key={2} headerText={'Grammar'}>
                <ScoreItem title={'Score'} main_text={data.speech_scores.language_scores.grammar_stats.score} description='Score for grammar' />
                <ScoreItem title={'Level'} main_text={data.speech_scores.language_scores.grammar_stats.level} description='Level for grammar'/>
            </TopicSectionDisplay>

            <TopicSectionDisplay key={3} headerText={'Pronunciation'}>
                <ScoreItem title={'Confidence'} main_text={data.speech_scores.language_scores.pronunciation_stats.average_confidence} description='Score for grammar' />
                <ScoreItem title={'Score'} main_text={data.speech_scores.language_scores.pronunciation_stats.score} description='Score for pronunciation'/>
                <ScoreItem title={'Level'} main_text={data.speech_scores.language_scores.pronunciation_stats.level} description='Level for pronunciation'/>
            </TopicSectionDisplay> */}
        </div>
    );
}