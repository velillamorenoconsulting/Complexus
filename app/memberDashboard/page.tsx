import React from "react";
import NavaBar from "../sections/NavaBar";
import MemberDashboard from "../pages/MemberDashboard";

export default function MDashboard() {
  return (
    <main className="bg-zinc-600 min-h-screen">
      <NavaBar style="light" />
      <MemberDashboard />
    </main>
  );
}
