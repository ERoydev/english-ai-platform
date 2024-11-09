import React from 'react';
import { Link } from 'react-router-dom';
import FourRowItems from './FourRowItems';
import GridWindow from './GridWindow';
import { SectionType } from '../../PracticeApp/types';
import Path from '../../../../Paths';

/* 
Created to load dynamically sections from database data into PracticeApp
*/


const ContentList = ({ sections }: { sections: SectionType[]}) => {

    const getPathByName = (name: string): string => {
        const nameToPathMap = {
            Vocabulary: Path.Practice.Vocabulary,
            "Travel and Directions": Path.Practice.TravelAndDirections,
            "Daily Life": Path.Practice.DailyLife,
            "Communication Skills": Path.Practice.CommunicationSkills,
            "IELTS": Path.Practice.IELTS,
            "Professional and Academic": Path.Practice.ProfessionalandAcademic,
            "Global Events": Path.Practice.GlobalEvents,
        };

        return nameToPathMap[name] || '/'; // Fallback path if name not found
    }


    // Sort sections by id in ascending order
    const sortedSections = sections.sort((a: SectionType, b: SectionType) => a.id - b.id);

    // Helper function to chunk an array into specific groups
    const getSectionChunks = (array: SectionType[]) => {
        // Used for design purposes
        const chunks = [];
        let i = 0;
        
        while (i < array.length) {
            chunks.push({
                fourItems: array.slice(i, i + 4),
                ieltsItem: array[i + 4] || null,
                twoItems: array.slice(i + 5, i + 7),
            });
            i += 7; // Move to the next group
        }
        return chunks;
    };
    const sectionChunks = getSectionChunks(sortedSections);

    return (
    <div>
        {sectionChunks.map((chunk, index) => (
            <React.Fragment key={index}>
                <div>
                    <FourRowItems
                        item1={chunk.fourItems[0] && { label: chunk.fourItems[0].name, path: getPathByName(chunk.fourItems[0].name), img: chunk.fourItems[0].image_url }}
                        item2={chunk.fourItems[1] && { label: chunk.fourItems[1].name, path: getPathByName(chunk.fourItems[1].name), img: chunk.fourItems[1].image_url }}
                        item3={chunk.fourItems[2] && { label: chunk.fourItems[2].name, path: getPathByName(chunk.fourItems[2].name), img: chunk.fourItems[2].image_url }}
                        item4={chunk.fourItems[3] && { label: chunk.fourItems[3].name, path: getPathByName(chunk.fourItems[3].name), img: chunk.fourItems[3].image_url }}
                    />
                </div>

                {chunk.ieltsItem && (
                    <div className="window h-96 mb-8 overflow-hidden upwards">
                        <Link to={getPathByName(chunk.ieltsItem.name)}>
                            <GridWindow
                                label={chunk.ieltsItem.name}
                                labelClass="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white text-4xl"
                                size="h-[400px]"
                                img={chunk.ieltsItem.image_url}
                            />
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {chunk.twoItems[0] && (
                        <GridWindow
                            label={chunk.twoItems[0].name}
                            size="h-32 md:h-64"
                            img={chunk.twoItems[0].image_url}
                        />
                    )}
                    
                    {chunk.twoItems[1] && (
                        <GridWindow
                            label={chunk.twoItems[1].name}
                            size="h-32 md:h-64"
                            img={chunk.twoItems[1].image_url}
                        />
                    )}
                </div>
            </React.Fragment>
        ))}
    </div> 
    );
};

export default ContentList;
