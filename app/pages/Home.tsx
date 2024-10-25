import React from "react";
import HomeA from "../sections/home/HomeA";
import HomeB from "../sections/home/HomeB";
import HomeC from "../sections/home/HomeC";
import Footer from "../sections/Footer";

export default function HomePage() {
  return (
    <section className="h-screen bg-gray-500">
      <HomeA />
      <HomeB />
      <HomeC />
      <Footer style="dark" />
    </section>
  );
}
