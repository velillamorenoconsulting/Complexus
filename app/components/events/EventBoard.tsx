"use client";
import React, { useState } from "react";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import { Event } from "@/app/api/entities/event.entity";
import { convertDate, getImageUrl } from "@/app/utils/utils";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type EventSelectOptions = "past" | "upcoming";

type ComponentProps = {
  pastEvents: Event[];
  upcomingEvents: Event[];
};

export default function EventBoard({
  pastEvents,
  upcomingEvents,
}: ComponentProps) {
  const [selected, setSelected] = useState<EventSelectOptions>("past");
  const route = useRouter();
  return (
    <Tabs
      classNames={{
        tab: "font-comorant text-lg pb-1 md:pb-3 md:text-3xl font-semibold",
      }}
      variant="underlined"
      aria-label="Event Options"
      selectedKey={selected}
      onSelectionChange={setSelected as any}
    >
      <Tab key="past" title="Eventos Anteriores">
        {pastEvents.map((event) => (
          <div key={event.eventId} className="flex flex-col items-center">
            <div className="flex flex-col lg:flex-row md:p-10 items-center justify-evenly w-full lg:w-[80%] gap-7">
              <div className="flex flex-col w-full lg:max-w-[50%] gap-2">
                <p className="font-comorant text-2xl">
                  {convertDate(event.startAt)}
                  {event.endAt ? `- ${convertDate(event.endAt)}` : ""},{" "}
                  {event.location.ubication}
                </p>
                <h4 className="font-comorant text-4xl font-semibold text-[#3a6351] italic">
                  {event.title}
                </h4>
                <p className="font-raleway text-xl pt-3 text-black/70">
                  {event.description}
                </p>
                <Button
                  radius="full"
                  className="max-w-[200px] mt-5 ml-3 font-raleway text-lg underline bg-[#3a6351] text-white"
                  onClick={() => route.push(`/events/${event.eventId}`)}
                >
                  Ver más
                </Button>
              </div>
              <Carousel
                className="max-w-[550px] h-[380px]"
                leftControl={event.images.length > 1 ? undefined : " "}
                rightControl={event.images.length > 1 ? undefined : " "}
                slide={false}
                indicators={event.images.length > 1}
                theme={{
                  control: {
                    base: "bg-transparent",
                  },
                }}
              >
                {event.images.slice(0, 5).map(
                  (
                    imgSrc, // Takes just the first 5 images for preview
                  ) => (
                    <Image
                      key={imgSrc}
                      src={getImageUrl(imgSrc, event.imageFolder)}
                      alt={event.images[0]}
                      width={600}
                      height={600}
                      className="max-w-[600px]"
                    />
                  ),
                )}
              </Carousel>
            </div>
            <Divider className="w-[50%] my-5 h-1 bg-[#3a6351]/50" />
          </div>
        ))}
      </Tab>
      <Tab key="upcoming" title="Próximos Eventos">
        <div className="min-h-screen"></div>
      </Tab>
    </Tabs>
  );
}
