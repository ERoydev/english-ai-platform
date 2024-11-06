import { Link } from "react-router-dom";
import GridWindow from "./GridWindow";
import Path from "../../../../Paths";
import { Images } from "..";



export default function FourRowItems({
    item1,
    item2,
    item3,
    item4,
    textColor,
}:{
    item1: { label: string, path: string, img: string },
    item2?: { label: string, path: string, img: string },
    item3?: { label: string, path: string, img: string },
    item4?: { label: string, path: string, img: string },
    textColor?: string,  // pass color like 'text-white', 'text-gray-800', etc.
}) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-5">

            {item1 && (
                <Link to={item1.path}>
                    <GridWindow label={item1.label} size="h-32 md:h-64" img={item1.img} customClass={textColor ? textColor : ''}/>
                </Link>
            )}

            {item2 && (
                <Link to={item2.path}>
                    <GridWindow label={item2.label} size="h-32 md:h-64" img={item2.img} customClass={textColor ? textColor : ''} />
                </Link>
            )}

            {item3 && (
                <Link to={item3.path}>
                    <GridWindow label={item3.label} size="h-32 md:h-64" img={item3.img} customClass={textColor ? textColor : ''} />
                </Link>
            )}

            {item4 && (
                <Link to={item4.path}>
                    <GridWindow label={item4.label} size="h-32 md:h-64" img={item4.img} customClass={textColor ? textColor : ''} />
                </Link>
            )}
        </div>
    );
}