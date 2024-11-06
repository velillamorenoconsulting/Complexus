import EventLoading from "@/app/components/events/EventLoading";
import Footer from "@/app/sections/Footer";
import NavaBar from "@/app/sections/NavaBar";
import React from "react";

export default function loading() {
  return (
    <main>
      <NavaBar style="dark" />
      <EventLoading />
      <Footer style="dark" />
    </main>
  );
}
