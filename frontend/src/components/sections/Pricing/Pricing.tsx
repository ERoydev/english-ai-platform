import Header from "../../common/shared/Header/Header";
import PricingCard from "./PricingCard"
import data from "./index";
import withScrollAnimation from "../../decoration/WithScrollAnimation";

function PricingContent() {
    return(
        <section className="max-container py-28">
            <div className="text-center">
                <Header title="Our " coloredText={"Pricing"} coloredClass="secondary-header-color" size="text-4xl" infoText="flexible plans"/>
            </div>

            <div className="flex gap-5 max-md:flex-col justify-center px-10">
                {data && data.length > 0 && data.map((item, index) => (
                    <PricingCard 
                        key={index}
                        title={item.title} 
                        price={item.price} 
                        description={item.description}
                        benefits={item.benefits} 
                    />
                ))}
            </div>
        </section>
    );
}

const Pricing = withScrollAnimation(PricingContent);

export default Pricing;