import React from "react";

export default function HomeA() {
  return (
    <div className="h-screen relative">
      <div className="h-full absolute z-0 overflow-y-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover h-full ar-16-9:w-full ar-16-9:h-auto"
        >
          <source src="/HomeVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="h-full justify-center flex flex-col items-end p-10 animate-slideIn max-w-[2300px]">
        <h2 className="text-xl text-white z-10 w-[50%] text-right font-raleway">
          Corporacion de pensamiento complejo
        </h2>
        <h1 className="text-7xl text-white z-10 font-comorant font-black">
          Complexus
        </h1>
      </div>
    </div>
  );
}
