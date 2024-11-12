
/*
Displays my Subtopics
*/

import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import { useEffect, useState } from "react";
import { getSubtopics } from "../../../../services/Questions/getSubtopics";
import ContentList from "./ContentList";
import Path from "../../../../Paths";

export default function ListItem() {
    const location = useLocation();
    const { sectionId } = location.state || {};
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSubtopics = async () => {
            const allSubtopics = await getSubtopics(sectionId);
            setItems(allSubtopics);
        }

        loadSubtopics();

    }, [])

    const clickHandler = (item) => {
        const subtopicId = item.sectionId;
        navigate(Path.Practice.Quiz, { state : {topicId: subtopicId}})
    }

    return(
        <section>
           <BasePracticeApp />

           <div className="p-4 md:ml-64 h-auto pt-10">
                <Header title="Quiz " coloredText="Exercises" customClass="mb-5 font-semibold" size={"text-3xl"} coloredClass="secondary-header-color"/>
                
                <div>
                    <ContentList sections={items} handleItemClick={clickHandler}/>
                </div>
           </div>
        </section>
    );
}