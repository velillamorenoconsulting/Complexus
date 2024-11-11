import TestimoniesComp from "@/app/components/testimony/TestimoniesComp";
import React from "react";

export default function TestimonyA() {
  return (
    <div className="flex flex-col flex-1 h-full gap-7 pb-10">
      <h2 className="font-comorant text-4xl lg:text-5xl pt-10">
        ¿Qué dicen de nosotros?
      </h2>
      <div className="flex flex-1 flex-col pt-10">
        <TestimoniesComp />
      </div>
    </div>
  );
}
