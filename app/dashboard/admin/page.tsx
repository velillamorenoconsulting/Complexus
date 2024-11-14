import AdminDashboard from "@/app/pages/AdminDashboard";
import NavaBar from "@/app/sections/NavaBar";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen bg-zinc-600 flex flex-col">
      <NavaBar style="light" />
      <AdminDashboard />
    </main>
  );
}
