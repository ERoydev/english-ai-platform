import { VerticalTimeline }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React from 'react';
import TimeLineElement from './TimelineElement';



interface TimelineProps {
    data: object[]
}

const Timeline: React.FC<TimelineProps> = ({data}) => {
    return(
        <div> 
            <VerticalTimeline >
                {data && data.length > 0 && data.map((item, index) => (
                    <TimeLineElement key={index} title={item.title} description={item.description} step={`Step ${index + 1}`} />
                ))}
            </VerticalTimeline>
        </div>
    );
}

export default Timeline;