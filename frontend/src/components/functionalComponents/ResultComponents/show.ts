import React, { useEffect, useRef, useState } from "react"
import { testimonials } from "../../sections/Testimonials";


interface CustomSliderProps {
  slides: testimonials[]
}

const CustomSlider: React.FC<CustomSliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const slideInterval = useRef(0);

    useEffect(() => {
        startSlideTimer();
        return () => {
            stopSlideTimer()
        };
    }, [currentIndex])

    const startSlideTimer = () => {
      /* 
        This specify the timer to slide in my case is 5 seconds for each slide
      */
        slideInterval.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000)
    }

    const stopSlideTimer = () => {
        clearInterval(slideInterval.current);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        stopSlideTimer();
        startSlideTimer();
    };

    return (
        <div className="relative overflow-hidden h-[27rem]">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`w-full h-full flex-shrink-0 flex items-center justify-center`}
              >
                  <div className="swiper-slide w-[60%] max-xl:w-[85%]">

                        
                  </div>
              </div>
            ))}
          </div>

          {/* Slider */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(slide.id)}
                className={`w-6 h-3 rounded-full ${slide.id === currentIndex ? 'bg-blue-600' : 'bg-gray-400'} hover:cursor-pointer hover:bg-blue-400`}
              ></button>
            ))}
          </div>
        </div>
      );
}

export default CustomSlider;