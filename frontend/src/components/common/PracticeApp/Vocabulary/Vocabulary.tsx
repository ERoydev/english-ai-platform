import { Images } from "..";
import Path from "../../../../Paths";
import Header from "../../shared/Header/Header";
import BasePracticeApp from "../BasePracticeApp";
import FourRowItems from "../../shared/EducationContentDisplay/FourRowItems";

export default function Vocabulary() {
    return(
        <section>
           <BasePracticeApp />

           <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Quiz " coloredText="Exercises" customClass="mb-5 font-semibold" size={"text-3xl"} coloredClass="secondary-header-color"/>
                
                <div>
                    <FourRowItems
                        item1={{label: 'Multiple Choice Questions', path: Path.Practice.MultipleChoiceQuestion, img: Images.multiple_choice}}
                        item2={{label: 'Fill in the Blank', path: Path.Practice.FillTheBlank, img: Images.fill_the_blank}}
                        item3={{label: 'Synonym/Antonym Matching', path: Path.Practice.Matching, img: Images.matching}}
                        item4={{label: 'Sentence Completion', path: Path.Practice.SentenceCompletion, img: Images.sentence_completion}}
                    />
                </div>
           </div>
        </section>
    );
}