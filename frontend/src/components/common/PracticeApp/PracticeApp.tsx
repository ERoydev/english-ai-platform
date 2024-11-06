// Components
import Header from "../shared/Header/Header";
import GridWindow from "./reusable/GridWindow.tsx";

// Mapping Files
import { Images} from "./index.tsx";

// FontAwesome
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Path from "../../../Paths.tsx";
import { Link } from "react-router-dom";
import BasePracticeApp from "./BasePracticeApp.tsx";
import FourRowItems from "./reusable/FourRowItems.tsx";


export default function PracticeApp() {
    const userData = useSelector(state => state.auth.userInfo);


    return(
        <section className="">
           <BasePracticeApp />
            
            {/* Main Content Boxes here !!! */}
            <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Hello back, " customClass="mb-5" size={"text-3xl"} coloredText={userData.user ? userData?.user?.email : 'Anonymous'} coloredClass="secondary-header-color"/>
                
                <div className="flex gap-5 items-center py-10 border-b-2">
                    <div>
                        <FontAwesomeIcon icon={faClock} className="w-[50px] h-[50px] text-gray-300" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-gray-500 text-lg">Speaking Time</h1>
                        <h1 className="font-bold text-black text-3xl leading-8">81 min</h1>
                    </div>
                </div>
                
                <div>
                    <FourRowItems
                        item1={{label: 'Vocabulary', path: Path.Practice.Vocabulary, img: Images.vocabulary}}
                        item2={{label: 'Grammar', path: Path.Practice.Grammar, img: Images.grammar}}
                        item3={{label: 'Speaking', path: Path.Practice.Speaking, img: Images.speaking}}
                        item4={{label: 'Reading & Writting', path: Path.Practice.ReadingWriting, img: Images.reading}}
                    />
                </div>

                <div className="window h-96 mb-8 overflow-hidden upwards">
                    <Link to={Path.Practice.IELTS}>
                        <GridWindow 
                            label="IELTS" 
                            labelClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white text-4xl" 
                            size="h-[400px]" 
                            img={Images.ielts} 
                        />
                    </Link>
                </div> 

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <GridWindow label="Listening" size="h-32 md:h-64" img={Images.listening} />
                    <GridWindow label="Synonyms and Antonyms" size="h-32 md:h-64" img={Images.synonyms} />
                </div>
            </div>
        </section>
    );
}