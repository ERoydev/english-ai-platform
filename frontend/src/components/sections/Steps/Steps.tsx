import Header from "../../common/shared/Header";
import WindowItem from "../../common/shared/WindowItem.js";
import data from './index.ts';

export default function Steps() {
    return(
        <section className="max-container flex flex-col pb-32">
            <div className="text-center">
                <Header title="What we " coloredText="offer" coloredClass="secondary-header-color" size="text-4xl" infoText="Features"/>
            </div>

            <div>
                <div className="flex justify-between">
                    {data && data.length > 0 && data.map((item, index) => (
                        <WindowItem key={index} imgUrl={item.url} text={item.text}/>
                    ))}
                </div>
            </div>
        </section>
    );
}