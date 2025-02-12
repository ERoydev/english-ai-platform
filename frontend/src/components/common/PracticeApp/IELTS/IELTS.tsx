import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import Path from "../../../../Paths";
import SubWindow from "./SubWindow";


export default function IELTS() {
    const microphoneUrl = "https://res.cloudinary.com/dnxlpgzu7/image/upload/v1739378722/microphone_cj9vzr.svg";
    const writingUrl = "https://res.cloudinary.com/dnxlpgzu7/image/upload/v1739378722/writing_whdgku.svg";
    return(
        <section>
            <div className="max-container">
                <h1 className="text-center font-semibold text-2xl py-10">AI-Powered IELTS preparation tests.</h1>
                
        
                <div className="mb-16 px-20 py-32 subwindow">
                    <div className="flex justify-between items-center">
                
                        <div>
                            <p className="info-text">Practice</p>
                            <h1 className="font-normal text-3xl pb-10">Start your <span className="font-bold">IELTS Speaking</span> with our free test</h1>

                            <Link to={Path.Practice.IeltsSpeaking}>
                                <Button label="Start the test"/>
                            </Link>
                        </div>

                        <div>
                            <img className="w-48" src={microphoneUrl} alt="" />

                        </div>
                    </div>
                </div>
              

                <div className="flex gap-5">

                    <SubWindow img={microphoneUrl} text="Full IELTS Speaking practice test" />

                    <SubWindow img={writingUrl} text="Full IELTS Writing practice test" />

                </div>
            </div>
        </section>
    );
}