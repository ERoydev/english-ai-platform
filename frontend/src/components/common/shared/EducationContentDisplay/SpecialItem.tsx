import { Link } from "react-router-dom";
import GridWindow from "./GridWindow";
import Path from "../../../../Paths";

// This is not created well it needs REFACTOR !!!!

interface ItemInterface {
    id: number;
    description: string;
    image_url: string;
    name: string;
}

export default function SpecialItem({
    item,
}: {
    item: ItemInterface; 
}) {

    return(
        <div className="window h-96 mb-8 overflow-hidden upwards">
            {/* NEED TO FIX NAVIGATION LOGIC BUT WHEN I USE handleClick from PracticeApp the BasePracticeApp is rendered too  */}
            <Link to={Path.Practice.IELTS}> 
                <GridWindow
                    label={item.name}
                    labelClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white text-4xl"
                    size="h-[400px]"
                    img={item.image_url}
                />
            </Link>
        </div>
    );
}