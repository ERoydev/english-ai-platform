import { Images } from "..";
import Path from "../../../../Paths";
import Header from "../../shared/Header/Header";
import BasePracticeApp from "../BasePracticeApp";
import FourRowItems from "../reusable/FourRowItems";

export default function Vocabulary() {
    return(
        <section>
           <BasePracticeApp />

           <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Daily " coloredText="Exercises" customClass="mb-5 font-semibold" size={"text-3xl"} coloredClass="secondary-header-color"/>
                
                <div>
                    <FourRowItems
                        item1={{label: 'Multiple Choice Questions', path: Path.Practice.Vocabulary, img: Images.multiple_choice}}
                        item2={{label: 'Fill in the Blank', path: Path.Practice.Vocabulary, img: Images.fill_the_blank}}
                        item3={{label: 'Synonym/Antonym Matching', path: Path.Practice.Vocabulary, img: Images.matching}}
                        item4={{label: 'Sentence Completion', path: Path.Practice.Vocabulary, img: Images.sentence_completion}}
                    />

                    <FourRowItems 
                        item1={{label: 'Contextual Sentence Writing', path: Path.Practice.Vocabulary, img: Images.context_writing}}
                        item2={{label: 'Open-Ended Writing Section', path: Path.Practice.Vocabulary, img: Images.writing}}
                    />
                </div>
           </div>
        </section>
    );
}