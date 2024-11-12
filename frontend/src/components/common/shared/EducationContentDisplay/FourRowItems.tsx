import GridWindow from "./GridWindow";
/*
Used grid for design purposes display 4 elements on one row responsive grid
*/


export default function FourRowItems({
    item1,
    item2,
    item3,
    item4,
    textColor,
    itemClickHandler,
}:{
    item1: { label: string, img: string, sectionId: number },
    item2?: { label: string, img: string, sectionId: number },
    item3?: { label: string, img: string, sectionId: number },
    item4?: { label: string, img: string, sectionId: number },
    textColor?: string,  // pass color like 'text-white', 'text-gray-800', etc.
    itemClickHandler: () => void; // pass a function to handle item click event.  // Example: itemClickHandler={handleClick}  // In the parent component where you use this component, handleClick function will be called with the clicked item's sectionId.  // This is just a sample implementation. You can modify it according to your requirement.  // Also, you need to import Path from the path file.  // Replace
}) {

    const clickHandler = (item) => {
        // Handles when GridWindow item is clicked
        itemClickHandler(item);
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-5">

            {item1 && (
                <div onClick={() => clickHandler(item1)}>
                    <GridWindow label={item1.label} size="h-32 md:h-64" img={item1.img} customClass={textColor ? textColor : ''}/>
                </div>

            )}

            {item2 && (
                <div onClick={() => clickHandler(item2)}>
                    <GridWindow label={item2.label} size="h-32 md:h-64" img={item2.img} customClass={textColor ? textColor : ''} />
                </div>
            )}

            {item3 && (
                <div onClick={() => clickHandler(item3)}>
                    <GridWindow label={item3.label} size="h-32 md:h-64" img={item3.img} customClass={textColor ? textColor : ''} />
                </div>
            )}

            {item4 && (
                <div onClick={() => clickHandler(item4)}>
                    <GridWindow label={item4.label} size="h-32 md:h-64" img={item4.img} customClass={textColor ? textColor : ''} />
                </div>
            )}
        </div>
    );
}