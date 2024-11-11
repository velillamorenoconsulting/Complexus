"use client";
import React, { Suspense } from "react";
import CompLoading from "../components/CompLoading";
import PublicationsA from "../sections/publications/PublicationsA";
import PublicationsB from "../sections/publications/PublicationsB";

export default function Publications() {
  return (
    <section className="min-h-screen bg-[#22302f] text-white">
      <PublicationsA />
      <Suspense
        fallback={<CompLoading hasBackground={false} height="h-[700px]" />}
      >
        <PublicationsB />
      </Suspense>
    </section>
  );
}
