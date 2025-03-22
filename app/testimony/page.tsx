import React from "react";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";
import Testimony from "../pages/Testimony";

export default function TestimonyPage() {
  return (
    <main className="h-full">
      <NavaBar style="dark" />
      <Testimony />
      <Footer style="dark" />
    </main>
  );
}
