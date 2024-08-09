import robot from "../../../assets/images/robot.png";
import Button from "../../common/shared/Button/Button";
import Letter from "../../common/shared/Letter/Letter";
import LetterCycle from "../../common/shared/Letter/LetterCycle";
import chart from "../../../assets/svgs/chart.svg";
import Header from "../../common/shared/Header/Header";

export default function Hero() {
    const Letters: string[] = [
        'Learn with AI-Powered Lessons',
        'Engage with Interactive Content',
        'Achieve Fluency Faster',
        'Reach Your Potential',
        'Navigate Your Learning Path',
    ];

    return (
        <section className="max-container relative flex items-center justify-between gap-5 padding">
            <header className="w-[50%] relative max-xl:w-full max-xl:flex max-xl:flex-col max-xl:text-center max-xl:mt-16">
                <div className="flex flex-col gap-14 mb-16">
                    <div className="flex flex-col gap-5">
                        <Header title='Master English with ' coloredText="Intelligent Learning" coloredClass="primary-header-color" customClass="mb-0 font-black text-4xl" size="text-4xl"/>
                        <p className="text-base max-md:text-sm">Harness the power of AI to improve your English skills. With personalized courses, real-time feedback, and engaging content, fluency is within your reach. Start learning today!</p>
                    </div>
                    
                    <div className="max-xl:flex max-xl:justify-center">
                        <Button label="Start Now" />
                    </div>
                </div>
                 
                 {/* Decoration 5k+, 4K+ */}
                <div className="flex gap-10 absolute max-xl:hidden">
                    <div className="flex flex-col text-center">
                        <p className="text-4xl font-black text-gray-400">5K</p>
                        <p className="text-gray-400">Users</p>
                    </div>
                    <div className="flex flex-col text-center">
                        <p className="text-4xl font-black text-gray-400">2K+</p>
                        <p className="text-gray-400">Completed Courses</p>
                    </div>
                </div>
            </header>


            <div className="relative max-xl:hidden">
                <Letter title='IELTS' bgColor="bg-blue-600" textColor="text-white" size='text-xl font-extrabold'  positionOptions="left-10 top-5" rotateClass='-rotate-12'/>
                <Letter title='AI' bgColor="bg-white" textColor="text-blue-700" size='text-xl font-extrabold' positionOptions="right-10 top-8" rotateClass="rotate-12" />
                <Letter title='B2, C1' bgColor="bg-white" textColor="text-blue-700" size='text-xl font-extrabold' positionOptions="right-10 bottom-14" rotateClass="-rotate-12" />
                
                <div className="absolute rounded-xl px-3 py-2 shadow-lg border bg-white border-slate-200 bottom-20 left-10 z-10 shadow-cyan-500/50">
                    <img src={chart} className="w-[32px] h-[32px]" alt="Chart icon" />
                </div>
                
                <div className="relative rounded-full overflow-hidden border-8 border-slate-800">
                    <img src={robot} className="w-[600px] h-[600px]" alt="human-robot" />
                    <LetterCycle texts={Letters} />
                </div>
            </div>
    

        </section>
    );
}