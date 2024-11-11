"use client";
import React from "react";
import Carousel from "../components/carousel/Carousel";
import Image from "next/image";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";

export default function page() {
  return (
    <main>
      <NavaBar style="light" />
      <div className="min-h-screen bg-black"></div>
      <Footer style="dark" />
    </main>
  );
}
