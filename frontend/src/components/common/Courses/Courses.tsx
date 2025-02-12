import CourseItem from "./CourseItem";


export default function Courses() {
    return(
        <section className="flex flex-wrap justify-center gap-5 max-container py-20 px-10 max-md:flex-col">        
            <CourseItem label="Job Interview Preparation" img={""} />
            <CourseItem label="General Speaking" img={""} />
            <CourseItem label="Business English" img={""} />
            <CourseItem label="Advanced Speaking Techniques" img={""} />
            <CourseItem label="Conversational English" img={""} />
            <CourseItem label="Negotiation and Persuasion" img={""} />
        </section>
    );
}