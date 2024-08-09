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

                        <div className="group bg-white border border-solid border-gray-300 rounded-xl p-6 max-xl:p-3 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-sm slide_active:border-indigo-600">
                            
                            {/* Rating + Review Text */}
                            <div>
                                {/* Rating */}
                                <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500  ">
                                    <svg className="w-5 h-5" viewBox="0 0 18 17" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                                            fill="currentColor" />
                                    </svg>
                                    <span className="text-base font-semibold text-indigo-600">{slide.rating}</span>
                                </div>

                                {/* Review Text */}
                                <p
                                    className="max-xl:text-xs text-base text-gray-600 leading-6  transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800">
                                    {slide.text}
                                </p>
                            </div>
                            
                            {/* Person Initials */}
                            <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
                                <img className="rounded-full h-10 w-10" src="https://pagedone.io/asset/uploads/1696229969.png"
                                    alt="avatar" />
                                <div className="block">
                                    <h5 className="max-xl:text-xs text-gray-900 font-medium transition-all duration-500  mb-1">{slide.firstName} {slide.lastName}</h5>
                                    <span className="max-xl:text-xs text-sm leading-4 text-gray-500">{slide.role}</span>
                                </div>
                            </div>

                        </div>
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