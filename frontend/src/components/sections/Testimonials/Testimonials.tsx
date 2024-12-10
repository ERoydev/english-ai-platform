import Header from "../../common/shared/Header/Header.tsx";
import CustomSlider from "../../common/shared/Slider/CustomSlider.tsx";
import data from './index.ts';
import BorderBar from "../../decoration/BorderBar.tsx";
import withScrollAnimation from "../../decoration/WithScrollAnimation.tsx";
import SliderParent from "../../common/shared/Slider/SliderParent.tsx";
import { useEffect, useState } from "react";
import { getTestimonials } from "../../../services/Testimonials/TestimonialService.ts";
import TestimonialTemplate from "./TestimonialItemTemplate.tsx";
import TestimonialInterface from "../../../services/Testimonials/TestimonialInterface.ts";



function TestimonialsContent() {
    const [testimonials, setTestimonials] = useState<TestimonialInterface[]>([]);

    useEffect(() => {
        getTestimonials() 
            .then((result) => {
                setTestimonials(result.data);
            })
    }, [])
    return(
        <>
            <section className="pt-10">
                <div className="text-center">
                    <Header title="What people say " coloredText="about us" coloredClass="secondary-header-color" size='text-4xl' infoText="Testimonial"/>
                </div>

                <div className="relative bg-testimonial-texture bg-cover bg-center overlay">
                    <SliderParent 
                        data={testimonials}    
                        Component={TestimonialTemplate}
                    />
                </div>
                
            </section>
            <BorderBar />
        </>
    );
}


const Testimonials = withScrollAnimation(TestimonialsContent);

export default Testimonials;