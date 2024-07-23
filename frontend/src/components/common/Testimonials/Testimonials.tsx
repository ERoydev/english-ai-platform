import Header from "../shared/Header";
import CustomSlider from "../shared/CustomSlider";
import data from './index.ts';



export default function Testimonials() {
    return(
        <section className="py-10">
            <div className="text-center">
                <Header title="What people say " coloredText="about us" coloredClass="secondary-header-color" size='text-4xl' infoText="Testimonial"/>
            </div>

            <div className="relative bg-testimonial-texture bg-cover bg-center inner-shadow">
                <CustomSlider slides={data} />
            </div>
        </section>
    );
}