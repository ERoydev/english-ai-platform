import CourseItem from "./CourseItem";


export default function Courses() {
    return(
        <section className="flex gap-5 max-container py-20 flex-wrap">
            <CourseItem label="Job Interview Preparation" />
            <CourseItem label="General Speaking" />
            <CourseItem label="Business English" />
            <CourseItem label="Advanced Speaking Techniques" />
            <CourseItem label="Conversational English" />
            <CourseItem label="Negotiation and Persuasion" />
        
        </section>
    );
}