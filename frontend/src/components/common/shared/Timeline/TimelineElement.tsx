import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';

export interface TimelineElementProps {
    title: string;
    description: string;
    step: string;
}


const TimeLineElement: React.FC<TimelineElementProps> = ({title, description, step}) => {
    return(
        <VerticalTimelineElement
            className="vertical-timeline-element--work upwards"
            contentStyle={{ background: 'rgba(148, 163, 184, 0.3)', color: '#fff',}}
            contentArrowStyle={{ borderRight: '7px solid  rgba(148, 163, 184, 0.3)'}}
            date={step}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title text-2xl font-medium ">{title}</h3>
            <p className='text-slate-400'>
                {description}
            </p>
        </VerticalTimelineElement>
    );
}

export default TimeLineElement;