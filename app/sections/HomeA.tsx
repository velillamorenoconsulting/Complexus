"use client";
import React from "react";

export default function HomeA() {
  return (
    <div className="h-screen">
      <video autoPlay muted loop playsInline className="object-cover h-full">
        <source src="/HomeVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
