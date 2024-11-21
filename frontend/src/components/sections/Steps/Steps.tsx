import Header from "../../common/shared/Header/Header.tsx";
import WindowItem from "../../common/shared/WindowItem.js";
import data from './index.ts';
import withScrollAnimation from "../../decoration/WithScrollAnimation.tsx";

function StepsContent() {
    return(
        <section className="max-container flex flex-col pb-32 px-10" id="features">
            <div className="text-center">
                <Header title="What we " coloredText="offer" coloredClass="secondary-header-color" size="text-4xl" infoText="Services"/>
            </div>
            <div>
                <div>
                    <div className="flex flex-wrap gap-10 justify-center">
                        {data && data.length > 0 && data.map((item, index) => (
                            <WindowItem key={index} title={item.title} text={item.description} icon={item.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const Steps = withScrollAnimation(StepsContent);
export default Steps;