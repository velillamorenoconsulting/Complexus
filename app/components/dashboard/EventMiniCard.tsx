import { Event } from "@/app/api/entities/event.entity";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

type Props = { event: Event };

export default function EventMiniCard({ event }: Props) {
  const missingDays = Math.ceil(
    Math.abs(new Date(event.startAt).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );
  return (
    <Card radius="sm">
      <CardBody className="flex flex-row justify-between">
        <div className="flex flex-col gap-2 w-[70%]">
          <p className="font-raleway text-md opacity-30">
            {event.location} -{" "}
            {new Date(event.startAt).toLocaleDateString("es-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h5 className="text-lg font-raleway font-semibold">{event.title}</h5>
          <p className="font-raleway opacity-60">{event.description}</p>
        </div>
        <div>
          <p>{missingDays} dias</p>
        </div>
      </CardBody>
    </Card>
  );
}
