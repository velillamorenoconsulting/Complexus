import React from "react";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";
import Services from "../pages/Services";

export default function Page() {
  return (
    <main>
      <NavaBar style="light" />
      <Services />
      <Footer style="dark" />
    </main>
  );
}
