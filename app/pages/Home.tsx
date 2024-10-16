import React from "react";
import HomeA from "../sections/home/HomeA";
import HomeB from "../sections/home/HomeB";
import HomeC from "../sections/home/HomeC";

export default function HomePage() {
  return (
    <main className="h-screen bg-gray-500">
      <HomeA />
      <HomeB />
      <HomeC />
    </main>
  );
}
