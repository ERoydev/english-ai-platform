import Navigation from "../Navigation/Navigation";
import Hero from "../Hero/Hero";

export default function Home() {

    return (
        <div>
            <div className="w-[1090px] h-[400px] bg-[#482cc23d] rounded-[100%] absolute z-1 top-[50%] left-[60%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
            <Navigation />
            <Hero />
        </div>
    )
}