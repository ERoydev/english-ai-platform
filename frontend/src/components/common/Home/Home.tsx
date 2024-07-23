import Hero from "../Hero/Hero";
import Steps from "../Steps/Steps";
import Testimonials from "../Testimonials/Testimonials";

export default function Home() {

    return (
        <div>
            <div className="w-[1090px] h-[400px] bg-[#482cc23d] rounded-[100%] absolute z-1 top-[50%] left-[60%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
            <Hero />
            <Steps />
            <Testimonials />
        </div>
    )
}