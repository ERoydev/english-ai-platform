import React, { useEffect, useRef, useState } from "react";
import { CustomSliderProps } from "./types";



const CustomSlider: React.FC<CustomSliderProps> = ({
  slides,
  autoSlideInterval = 5000,
  renderNavigationDots = true,
  onSlideChange,
  customClassNames = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slideInterval = useRef<number | undefined>();

  // Start the slide timer on mount
  useEffect(() => {
    if (slides.length > 0) {
      startSlideTimer(); // Start the timer only if slides are available
    }
    return () => stopSlideTimer(); // Cleanup on unmount
  }, [slides]); // Re-run if slides change

  // Ensure `onSlideChange` is called when `currentIndex` updates
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex]);

  const startSlideTimer = () => {
    if (autoSlideInterval > 0) {
      slideInterval.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % slides.length;
          onSlideChange?.(newIndex);
          return newIndex;
        });
      }, autoSlideInterval);
    }
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
    stopSlideTimer();
    startSlideTimer();
  };

  return (
    <div
      className={`relative overflow-hidden ${
        customClassNames.container || "h-[24rem] max-lg:h-[30rem]"
      }`}
    >
      {/* Slide Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-grow flex-shrink-0 ${
              customClassNames.slide || "flex"
            }`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {renderNavigationDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-6 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-400 hover:bg-blue-400"
              } ${
                customClassNames.navigationDot || "hover:cursor-pointer"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
