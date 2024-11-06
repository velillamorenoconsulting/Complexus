import { Event } from "@/app/api/entities/event.entity";
import EventLoading from "@/app/components/events/EventLoading";
import EventDescription from "@/app/pages/EventDescription";
import Footer from "@/app/sections/Footer";
import NavaBar from "@/app/sections/NavaBar";
import { EventResponse } from "@/app/types/responses";
import axios from "axios";
import React from "react";

type Props = {
  params: { eventId: string };
};

export default async function SingleEvent({ params }: Props) {
  const { eventId } = params;
  const { data } = await axios.get<EventResponse>(
    `${process.env.NEXT_PUBLIC_BE_URL}/event/${eventId}`,
  );
  return (
    <main>
      <NavaBar style="light" />
      <EventDescription event={data.message} />
      <Footer style="dark" />
    </main>
  );
}
