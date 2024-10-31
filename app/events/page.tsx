import React from "react";
import NavaBar from "../sections/NavaBar";
import Footer from "../sections/Footer";
import Events from "../pages/Events";

export default function EventsPage() {
  return (
    <main>
      <NavaBar style="dark" />
      <Events />
      <Footer style="dark" />
    </main>
  );
}
