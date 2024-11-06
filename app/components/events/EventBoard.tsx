"use client";
import React, { useState } from "react";
import { Button, Card, Divider, Tab, Tabs } from "@nextui-org/react";
import { Event } from "@/app/api/entities/event.entity";
import { convertDate, eventTypePicker, getImageUrl } from "@/app/utils/utils";
import { Carousel } from "flowbite-react";
import { weekDays, monthList } from "@/app/utils/utils";
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
  console.log(upcomingEvents);
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
        <div className="min-h-screen flex flex-col p-0 pt-5 md:pt-7">
          <div className="flex flex-row flex-wrap gap-16 p-0 lg:p-10 justify-center 2xl:justify-start">
            {upcomingEvents.map((upcomingEvent) => {
              const date = new Date(upcomingEvent.startAt);

              return (
                <Card className="flex flex-col justify-evenly gap-7 items-center max-w-[600px] p-5 border-none bg-inherit">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={getImageUrl(
                          upcomingEvent.images[0],
                          upcomingEvent.imageFolder,
                        )}
                        alt={upcomingEvent.images[0]}
                        width={400}
                        height={400}
                        className="w-full max-h-[373px]"
                      />
                    </div>
                    <div className="flex flex-row px-3 justify-center gap-5">
                      <div className="rounded-2xl bg-black text-white">
                        <div className="flex flex-col gap-1 w-20 lg:w-28 font-raleway items-center justify-center p-3">
                          <p className="">{weekDays[date.getDay()]}</p>
                          <p className="text-2xl font-bold">{date.getDate()}</p>
                          <p>{`${monthList[date.getMonth()]} ${date.getFullYear()}`}</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-[150px] lg:w-[300px] gap-1 font-raleway justify-center items-center">
                        <p className="text-xl font-light text-center">
                          {eventTypePicker(upcomingEvent.eventType)}
                        </p>
                        <p className="text-xl font-bold text-center">
                          {`Precio: ${upcomingEvent.price ? `$${upcomingEvent.price}` : "GRATIS"}`}
                        </p>
                        <Button className="w-2/3 text-lg underline font-semibold">
                          {upcomingEvent.price
                            ? "Comprar entradas"
                            : "Solicitar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col max-w-[600px] gap-5">
                    <h3 className="font-comorant text-3xl font-semibold">
                      {upcomingEvent.title}
                    </h3>
                    <p className="font-raleway text-lg text-justify">
                      {upcomingEvent.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
