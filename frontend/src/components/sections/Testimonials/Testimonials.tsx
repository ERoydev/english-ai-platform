import Header from "../../common/shared/Header/Header.tsx";
import CustomSlider from "../../common/shared/CustomSlider";
import data from './index.ts';
import BorderBar from "../../decoration/BorderBar.tsx";
import withScrollAnimation from "../../decoration/WithScrollAnimation.tsx";


function TestimonialsContent() {
    return(
        <>
            <section className="pt-10">
                <div className="text-center">
                    <Header title="What people say " coloredText="about us" coloredClass="secondary-header-color" size='text-4xl' infoText="Testimonial"/>
                </div>

                <div className="relative bg-testimonial-texture bg-cover bg-center overlay">
                    <CustomSlider slides={data} />
                </div>
                
            </section>
            <BorderBar />
        </>
    );
}


const Testimonials = withScrollAnimation(TestimonialsContent);

export default Testimonials;