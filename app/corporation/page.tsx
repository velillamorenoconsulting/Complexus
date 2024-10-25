import React from "react";
import Corporation from "../pages/Corporation";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";

export default function Corp() {
  return (
    <main>
      <NavaBar style="dark" />
      <Corporation />
      <Footer style="light" />
    </main>
  );
}
