import React from "react";
import Corporation from "../pages/Corporation";
import NavaBar from "../sections/NavaBar";

export default function page() {
  return (
    <>
      <NavaBar style="dark" />
      <Corporation />
    </>
  );
}
