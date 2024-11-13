import AdminDashboard from "@/app/pages/AdminDashboard";
import NavaBar from "@/app/sections/NavaBar";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen bg-zinc-200 flex flex-col">
      <NavaBar style="dark" />
      <AdminDashboard />
    </main>
  );
}
