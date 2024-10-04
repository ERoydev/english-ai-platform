import Button from "../../shared/Button/Button";
import microphone from '../../../../assets/images/Practice/ielts/microphone.svg';
import writing from '../../../../assets/images/Practice/ielts/writing.svg';
import SubWindow from "./subWindow";
import { Link } from "react-router-dom";
import Path from "../../../../Paths";


export default function IELTS() {
    return(
        <section>
            <div className="max-container">
                <h1 className="text-center font-semibold text-2xl py-10">AI-Powered IELTS preparation tests.</h1>
                
        
                <div className="mb-16 px-20 py-32 subwindow">
                    <div className="flex justify-between items-center">
                
                        <div>
                            <p className="info-text">Practice</p>
                            <h1 className="font-normal text-3xl pb-10">Start your <span className="font-bold">IELTS Speaking</span> with our free test</h1>

                            <Link to={Path.IeltsSpeaking}>
                                <Button label="Start the test"/>
                            </Link>
                        </div>

                        <div>
                            <img className="w-48" src={microphone} alt="" />

                        </div>
                    </div>
                </div>
              

                <div className="flex gap-5">

                    <SubWindow img={microphone} text="Full IELTS Speaking practice test" />

                    <SubWindow img={writing} text="Full IELTS Writing practice test" />

                </div>
            </div>
        </section>
    );
}