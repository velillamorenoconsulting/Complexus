"use client";

import LoadingBoard from "@/app/components/events/LoadingBoard";
import { useEffect, useState } from "react";
import { EventList } from "@/app/types/responses";
import axios from "axios";
import { useStore } from "@/app/store/zustand";
import { Event } from "@/app/api/entities/event.entity";
import EventBoard from "@/app/components/events/EventBoard";

export default function EventsA() {
  const [loading, isLoading] = useState<boolean>(false);
  const { eventList, setEventList } = useStore();
  const [localEventList, setLocaleList] = useState<Event[]>([]);
  useEffect(() => {
    isLoading(true);
    if (eventList.length) {
      isLoading(false);
      setLocaleList(eventList);
    } else {
      const fetchData = async () => {
        const { data } = await axios.get<EventList>(`api/event?valid=true`);
        setEventList(data.message);
        setLocaleList(data.message);
        isLoading(false);
      };
      fetchData();
    }
  }, []);

  const pastEvents = localEventList.filter(
    (event) => new Date(event.startAt) < new Date(),
  );
  const upcomingEvents = localEventList.filter(
    (event) => new Date(event.startAt) > new Date(),
  );

  return (
    <div className="bg-[#eeefe8] px-10 min-h-screen">
      <div className="pt-32 lg:pt-44 flex flex-col">
        {loading ? (
          <LoadingBoard />
        ) : (
          <EventBoard upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        )}
      </div>
    </div>
  );
}
