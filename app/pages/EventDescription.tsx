"use client";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Event } from "../api/entities/event.entity";
import Carousel from "../components/carousel/Carousel";
import QuestionAccordion from "../components/events/QuestionAccordion";
import { convertDate, getImageUrl } from "../utils/utils";

type ComponentProps = {
  event: Event;
};

export default function EventDescription({ event }: ComponentProps) {
  return (
    <div className="bg-[#22302f] min-h-screen px-10 flex pb-10 relative">
      <div className="pt-32 lg:pt-44 flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-col 3xl:flex-row text-white md:p-10 gap-8 lg:gap-16 justify-center items-center">
          <div className="w-full 3xl:w-1/2 flex flex-col gap-3">
            <h2 className="font-comorant text-3xl lg:text-5xl text-left max-w-[80%] pb-2">
              {event.title}
            </h2>
            <div className="flex flex-col font-raleway">
              <p>
                {convertDate(event.startAt)}
                {event.endAt ? ` - ${convertDate(event.endAt)}` : ""}
              </p>
              <p className="opacity-70">
                <b>{event.location.ubication}</b>{" "}
                {event.location.address ? `, ${event.location.address}` : ""}
                {event.location.description
                  ? `, ${event.location.description}`
                  : ""}
              </p>
            </div>
            <Divider className="my-3 dark" />
            <div className="flex flex-col gap-4 font-raleway text-justify">
              {event.segments.map((segment, idx) => (
                <div key={idx}>
                  {segment.title && (
                    <h4 className="text-xl font-bold pb-1">{segment.title}</h4>
                  )}
                  {segment.text && <p className="text-lg">{segment.text}</p>}
                  {segment.list && (
                    <ul className="text-lg flex flex-col gap-2 list-disc pl-4">
                      {segment.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <p className="font-raleway text-lg text-justify">{}</p>
          </div>
          <div className="flex justify-center 3xl:w-1/2 w-[80%] items-center h-full relative">
            <div className="w-full max-w-[1000px] h-[300px] md:h-[500px] lg:h-[800px] self-center 3xl:max-w-[850px] flex items-center justify-center mb-10 md:mb-0">
              <Carousel
                maxVisualItems={10}
                items={event.images.map((imgSrc) => (
                  <Image
                    key={imgSrc}
                    alt={imgSrc}
                    src={getImageUrl(imgSrc, event.imageFolder)}
                    width={1200}
                    height={1200}
                    className="rounded-lg"
                  />
                ))}
              />
            </div>
          </div>
        </div>
        {event.questions.length ? (
          <div className="flex flex-col text-white p-10 gap-5">
            <h3 className="font-comorant text-5xl text-center font-semibold">
              Preguntas relevantes
            </h3>
            <div className="w-full xl:w-[80%] self-center">
              <QuestionAccordion questions={event.questions} />
            </div>
          </div>
        ) : (
          <></>
        )}
        {new Date(event.startAt) < new Date() && event.transmissionUrl ? (
          <div className="p-10 flex flex-col text-white gap-10">
            <h3 className="font-comorant text-5xl text-center font-semibold">
              Grabación del evento
            </h3>
            <div className="flex justify-center w-full">
              <iframe
                src={event.transmissionUrl}
                className="w-full xl:w-[70%] aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                frameBorder={0}
              ></iframe>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
