import { useLocation } from "react-router-dom";
import BasePracticeApp from "../../PracticeApp/BasePracticeApp";
import Header from "../Header/Header";

export default function QuizResult() {
    const location = useLocation();
    const {data} = location.state || {};

    return(
        <section>
            <BasePracticeApp />

            <div className="p-4 md:ml-64 h-auto pt-10 flex flex-col justify-center items-center relative">
                <Header title="Quiz " coloredText="Result" size="text-3xl" coloredClass="secondary-header-color" />

            
            </div>
        </section>
        
    );
}