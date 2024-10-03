import CourseItem from "./CourseItem";
import {Images} from './index.tsx';



export default function Courses() {
    return(
        <section className="flex flex-wrap justify-center gap-5 max-container py-20 px-10 max-md:flex-col">        
            <CourseItem label="Job Interview Preparation" img={Images.job_interview} />
            <CourseItem label="General Speaking" img={Images.general_speaking} />
            <CourseItem label="Business English" img={Images.business_english} />
            <CourseItem label="Advanced Speaking Techniques" img={Images.advanced_speaking} />
            <CourseItem label="Conversational English" img={Images.conversational_english} />
            <CourseItem label="Negotiation and Persuasion" img={Images.negotiation} />
        </section>
    );
}