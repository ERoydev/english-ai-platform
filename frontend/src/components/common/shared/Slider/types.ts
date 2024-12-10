export interface Slide {
    id: number;
    content: React.ReactNode; // Accept any JSX content for each slide
}

export interface CustomClassNames { // I can pass Custom class names to SliderParent which will be passed here when i want custom 'flex' related logic
    container?: string;
    slide?: string;
    navigationDot?: string;
}
  
export interface CustomSliderProps {
    slides: Slide[];
    autoSlideInterval?: number; // Time interval for auto-sliding
    renderNavigationDots?: boolean; // Option to render navigation dots
    onSlideChange?: (index: number) => void; // Callback for slide change
    customClassNames?: CustomClassNames
}
