// Components
import Header from "../shared/Header/Header";
import BasePracticeApp from "./BasePracticeApp.tsx";

// Services
import { getSections } from "../../../services/Questions/getSections.ts";

// React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// FontAwesome
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionType } from "./types.ts";
import ContentList from "../shared/EducationContentDisplay/ContentList.tsx";
import { useNavigate } from "react-router-dom";
import Path from "../../../Paths.tsx";
import LevelRadar from "../shared/Charts/LevelRadar.tsx";


export default function PracticeApp() {
    const userData = useSelector(state => state.auth.userInfo);
    const [sections, setSections] = useState<SectionType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSections = async () => {
            const allSections = await getSections();
            setSections(allSections);
        } 

        loadSections();
    }, [])

    const handleClick = (item) => {
        /* I pass this function in contentList so when content item is clicked this will trigger */
        navigate(Path.Practice.ListItem, { state: {sectionId: item.sectionId}});
    }

    console.log("SECIONTS", sections)
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
                
                <ContentList sections={sections} handleItemClick={handleClick} withSpecialItem={true} />
    
            </div> 
        </section>
    );
}