import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export interface CarouselIndicatorProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible: number;
  onSetActiveIndex: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

export default function CarouselIndicator({
  activeIndex,
  length,
  maxIndicatorVisible,
  onSetActiveIndex,
  handleNext,
  handlePrev,
}: CarouselIndicatorProps) {
  const maxIndicator =
    length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="carousel-indicator w-full lg::pt-3">
      <button
        className={`transform -translate-x-3 h-7 w-7 ${activeIndex > 0 ? "opacity-100" : "opacity-20"}`}
        onClick={handlePrev}
      >
        <IoIosArrowBack color="#9ca3af" className="w-full h-full" />
      </button>
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div
            key={index}
            className={`carousel-indicator-dots
            ${activeIndex === index ? "w-4 opacity-100" : "w-2 bg-gray-400"}`}
            onClick={() => {
              onSetActiveIndex(index);
            }}
          ></div>
        );
      })}

      <button
        className={`transform translate-x-3 h-7 w-7 ${activeIndex < length - 1 ? "opacity-100" : "opacity-20 cursor-default"}`}
        onClick={handleNext}
      >
        <IoIosArrowBack
          style={{
            transform: "rotate(180deg)",
          }}
          color="#9ca3af"
          className="w-full h-full"
        />
      </button>
    </div>
  );
}
