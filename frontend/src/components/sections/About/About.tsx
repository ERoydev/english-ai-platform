import Header from "../../common/shared/Header/Header";
import BorderBar from "../../decoration/BorderBar";
import withScrollAnimation from "../../decoration/WithScrollAnimation";


function AboutContent() {
    return(
        <section className="mt-10 z-0 relative">
            
         
            <div className="relative bg-about-texture bg-cover bg-center overlay z-10">
            
                <div className="flex flex-col">
                    <div className="z-20">
                        <BorderBar />
                    </div>
                </div>

                <div className="max-container py-12 z-30">

                  
                    <div className="text-center flex flex-col justify-center z-20 relative">
                        <Header title="About " size="text-4xl" customClass="mb-20 max-xl:mb-10 font-bold text-white z-20" coloredText="Us" coloredClass="secondary-header-color" infoText="learn about us"/>
                    </div>
                    <div className="flex items-center gap-5">

                        
                        <div className="flex flex-col gap-8 px-10">
                            <p className="max-xl:text-md max-md:text-sm max-sm:text-xs text-xl text-slate-400 z-20">At LexiLearn, 
                                our mission is to revolutionize
                                the way people learn English by leveraging the power of 
                                artificial intelligence. We believe that everyone deserves access to
                                high-quality education, and we are committed to providing personalized, 
                                effective, and engaging learning experiences to students worldwide.
                            </p>

                            <p className="max-xl:text-md max-md:text-sm max-sm:text-xs text-xl text-slate-400 z-20">
                                Founded in 2024, LexiLearn was born out of a passion for education and technology. Our founder is Emil Roydev, envisioned a platform that could break down language barriers and open up new opportunities for learners of all backgrounds. With years of experience in both language education and AI development, they set out to create a tool that could adapt to the unique needs of each learner.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="z-20">
                        <BorderBar />
                    </div>
                </div>
            </div>

            
        </section>
    );
}

const About = withScrollAnimation(AboutContent);

export default About;