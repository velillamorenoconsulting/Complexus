import React from "react";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";
import ContactPage from "../pages/Contact";

export default function Contact() {
  return (
    <main>
      <NavaBar style="light" />
      <ContactPage />
      <Footer style="dark" />
    </main>
  );
}
