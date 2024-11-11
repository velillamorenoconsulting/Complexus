import React, { useState } from "react";
import CarouselIndicator from "./CarouselIndicator";
import CarouselItem from "./CarouselItem";

type Props = {
  width?: number;
  height?: number;
  items: React.ReactNode[];
};

export default function Carousel({ width, height, items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : prev;
    });
  }

  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  }
  return (
    <div className="carousel-container flex justify-center w-full h-full items-center">
      {items?.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}

      <CarouselIndicator
        activeIndex={activeIndex}
        length={items.length}
        onSetActiveIndex={(activeIndex) => {
          setActiveIndex(activeIndex);
        }}
        handleNext={handleNextItemBtn}
        handlePrev={handlePrevItemBtn}
      />
    </div>
  );
}
