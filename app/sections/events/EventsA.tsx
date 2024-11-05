"use client";

import EventListComponent from "@/app/components/events/EventList";
import LoadingBoard from "@/app/components/events/LoadingBoard";
import { Suspense } from "react";

export default function EventsA() {
  return (
    <div className="bg-[#eeefe8] px-10">
      <div className="pt-32 lg:pt-44 flex flex-col">
        <Suspense fallback={<LoadingBoard />}>
          <EventListComponent />
        </Suspense>
      </div>
    </div>
  );
}
