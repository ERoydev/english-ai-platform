import robot from "../../../assets/images/robot.png";
import Button from "../shared/Button";
import Letter from "../shared/Letter";
import LetterCycle from "../shared/LetterCycle";
import chart from "../../../assets/svgs/chart.svg";

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
            <header className="w-[50%] flex flex-col gap-14">
                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl font-black">Master English with <span className="bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text">Intelligent Learning</span></h1>
                    <p className="text-base">Harness the power of AI to improve your English skills. With personalized courses, real-time feedback, and engaging content, fluency is within your reach. Start learning today!</p>
                </div>
                
                <div>
                    <Button label="Start Now" />
                </div>
            </header>


            <div className="relative">
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