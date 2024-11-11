"use client";
import React from "react";
import Carousel from "../components/carousel/Carousel";
import Image from "next/image";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";
import Publications from "../pages/Publications";

export default function page() {
  return (
    <main>
      <NavaBar style="light" />
      <Publications />
      <Footer style="dark" />
    </main>
  );
}
