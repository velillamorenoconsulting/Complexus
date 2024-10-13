import React from "react";
import Dashboard from "../pages/Dashboard";
import NavaBar from "../sections/NavaBar";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-200">
      <NavaBar style="dark" />
      <Dashboard />
    </main>
  );
}
