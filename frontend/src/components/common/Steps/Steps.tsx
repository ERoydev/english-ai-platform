import Header from "../shared/Header";
import WindowItem from "../shared/WindowItem.js";
import data from './index.ts';

export default function Steps() {
    return(
        <section className="max-container flex flex-col">
            <div className="text-center">
                <Header title="What we " coloredText="Offer" coloredClass="secondary-header-color"/>
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