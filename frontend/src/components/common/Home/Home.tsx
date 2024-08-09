import About from "../../sections/About/About";
import Contact from "../../sections/Contact/Contact";
import Hero from "../../sections/Hero/Hero";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import Pricing from "../../sections/Pricing/Pricing";
import Steps from "../../sections/Steps/Steps";
import Testimonials from "../../sections/Testimonials/Testimonials";

export default function Home() {

    return (
        <div>
            <div className="w-[80%] h-[400px] bg-[#482cc23d] rounded-[100%] absolute z-1 top-[50%] left-[60%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
            <Hero />
            <Steps />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <About />
            <Contact />
        </div>
    )
}