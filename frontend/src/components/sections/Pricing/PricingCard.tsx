import Button from "../../common/shared/Button/Button";

interface PricingCardProps {
    title: string,
    price: string,
    description: string,
    benefits: string[]
}


export default function PricingCard({title, price, description, benefits}: PricingCardProps) {
    return(
        <div className="window xl:padding-x xl:py-10 max-xl:px-5 max-xl:py-5 flex flex-col gap-5 w-[33%] max-xl:w-full relative hover:cursor-pointer hover:bg-indigo-700 hover:text-slate-100 transition ease-in-out">
            <h1 className="max-xl:text-2xl text-3xl font-medium">{title}</h1>
            <p className="max-xl:text-2xl text-3xl font-semibold">${price}<span className="text-lg text-slate-400">/Month</span></p>
            <p className="max-xl:text-xs">{description}</p>

            <ul className="flex flex-col gap-5 pb-24">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3 max-xl:gap-1 text-sm max-xl:text-xs items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] max-xl:w-[20px] max-xl:h-[20px] bg-slate-400 rounded-full px-2 py-2 max-xl:px-1 max-xl:py-1" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        {benefit}
                    </li>
                ))}
            </ul>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <Button label={'Choose Plan'} className="max-xl:text-xs" />

            </div>
        </div>
    );
}