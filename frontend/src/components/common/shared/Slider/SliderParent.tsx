import CustomSlider from "./CustomSlider";
import { CustomClassNames } from "./types";


/*
    Used as parent component to create slide and pass custom data to customSlider

*/


export default function SliderParent({
    data,
    Component,
    title,
    customClassNames
}: {
    data: any,
    Component: React.ComponentType<any>;
    title?: string[]
    customClassNames?: CustomClassNames
}) {   
    const filteredData = Object.entries(data).filter(([key]) => {
        // You can optionally add filtering logic here, e.g., filter by `title`
        return !title || title[key]; // Only include if key exists in title or include all
    });

    const slides = filteredData.map(([key, value], idx) => ({
        id: idx, // Use the key as the unique identifier
        content: (
            <Component
                key={idx} // Use the index as a key for the mapped content
                data={value} // Spread the value properties as props
                name={key} // Pass the key as the name
                title={title && title[key] ? title[key] : key} // Use title if available, otherwise fallback to key
            />
        ),
    }));

    return(
        <div>
            <CustomSlider 
                    slides={slides}
                    customClassNames={customClassNames} // Pass custom class names if they exist
            />
        </div>
    );
}