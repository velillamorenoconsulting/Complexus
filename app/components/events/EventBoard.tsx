"use client";
import { useState } from "react";
import { Button, Card, Divider, Tab, Tabs } from "@nextui-org/react";
import { Event } from "@/app/api/entities/event.entity";
import {
  convertDate,
  eventTypePicker,
  getImageUrl,
  formatPrice,
} from "@/app/utils/utils";
import { weekDays, monthList } from "@/app/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Carousel from "../carousel/Carousel";
import EventBuy from "./EventBuy";

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
          <div
            key={event.eventId}
            className="flex flex-col items-center lg:pt-0 pt-10 overflow-x-hidden"
          >
            <div className="flex flex-col xl:flex-row md:p-10 items-center justify-between 2xl:justify-evenly w-full gap-7">
              <div className="flex flex-col w-full xl:max-w-[40%] gap-2">
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
              <div className="w-full max-w-[600px] h-[300px] sm:h-[400px]">
                <Carousel
                  items={event.images.slice(0, 5).map((img) => (
                    <Image
                      key={img}
                      src={getImageUrl(img)}
                      alt={img}
                      width={600}
                      height={600}
                      className="max-w-[500px] xl:max-w-[600px] rounded-lg w-full"
                    />
                  ))}
                />
              </div>
            </div>
            <Divider className="w-[50%] my-5 h-1 bg-[#3a6351]/50" />
          </div>
        ))}
      </Tab>
      <Tab key="upcoming" title="Próximos Eventos">
        <div className="min-h-screen flex flex-col p-0 pt-5 md:pt-7 pb-16">
          <div className="flex flex-row flex-wrap gap-16 p-0 lg:p-10 justify-center">
            {upcomingEvents.length ? (
              upcomingEvents.map((upcomingEvent) => {
                const date = new Date(upcomingEvent.startAt);

                return (
                  <Card
                    key={upcomingEvent.eventId}
                    className="flex flex-col justify-evenly gap-7 items-center max-w-[600px] p-5 border-none bg-inherit"
                  >
                    <div className="flex flex-col gap-5 w-full">
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={
                            upcomingEvent.images.length
                              ? getImageUrl(upcomingEvent.images[0])
                              : "/events-sample.png"
                          }
                          alt={
                            upcomingEvent.images.length
                              ? upcomingEvent.images[0]
                              : "sample_event"
                          }
                          width={400}
                          height={400}
                          className="w-full max-h-[373px]"
                        />
                      </div>
                      <div className="flex flex-row px-3 justify-center gap-5">
                        <div className="rounded-2xl bg-black text-white">
                          <div className="flex flex-col gap-1 w-20 lg:w-28 font-raleway items-center justify-center p-3">
                            <p className="">{weekDays[date.getDay()]}</p>
                            <p className="text-2xl font-bold">
                              {date.getDate()}
                            </p>
                            <p className="text-center">{`${monthList[date.getMonth()]} ${date.getFullYear()}`}</p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[150px] lg:w-[300px] gap-1 font-raleway justify-center items-center">
                          <p className="text-xl font-light text-center">
                            {eventTypePicker(upcomingEvent.eventType)}
                          </p>
                          <p className="text-xl font-bold text-center">
                            {`Precio: ${upcomingEvent.price ? `${formatPrice(upcomingEvent.price)}` : "GRATIS"}`}
                          </p>
                          <EventBuy event={upcomingEvent} />
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
              })
            ) : (
              <div className="font-raleway text-xl text-center max-w-[90%] lg:max-w-[70%] pt-24 w-full opacity-80">
                En este momento no hay eventos próximos para fechas cercanas. Te
                invitamos a seguirnos en redes sociales para enterarte de los
                eventos que aún están desarrollandose.
              </div>
            )}
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}
