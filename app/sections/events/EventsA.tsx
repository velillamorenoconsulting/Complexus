import EventBoard from "@/app/components/events/EventBoard";
import { EventList } from "@/app/types/responses";
import axios from "axios";

export default async function EventsA() {
  try {
    const { data: eventList } = await axios.get<EventList>(
      `${process.env.NEXT_PUBLIC_BE_URL}/event`
    );
    return (
      <div className="bg-[#eeefe8] px-10">
        <div className="pt-32 lg:pt-44 flex flex-col">
          <EventBoard upcomingEvents={[]} pastEvents={eventList.message} />
        </div>
      </div>
    );
  } catch (e: any) {
    return <div>{e.message}</div>;
  }
}
