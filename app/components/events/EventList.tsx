import EventBoard from "./EventBoard";
import { EventList as EventListType } from "@/app/types/responses";
import axios from "axios";

export default async function EventListComponent() {
  try {
    const { data: eventList } = await axios.get<EventListType>(
      `${process.env.NEXT_PUBLIC_BE_URL}/event`,
    );
    return <EventBoard upcomingEvents={[]} pastEvents={eventList.message} />;
  } catch (e: any) {
    return <div>{e.message}</div>;
  }
}
