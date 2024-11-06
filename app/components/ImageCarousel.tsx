"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function ImageCarousel({ children, className }: Props) {
  return (
    <div className={`carousel relative ${className}`}>
      <div className="flex h-full snap-mandatory overflow-y-hidden scroll-smooth snap-x overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:[-webkit-appearance:none !important] [&::-webkit-scrollbar]:!hidden [&::-webkit-scrollbar]:!h-0 [&::-webkit-scrollbar]:!w-0 [&::-webkit-scrollbar]:!bg-transparent">
        {React.Children.map(children, (child, index) => (
          <div
            className="carousel-slide w-full flex-shrink-0 transform cursor-grab snap-center"
            key={index}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
