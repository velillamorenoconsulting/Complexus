"use client";
import { Testimony } from "@/app/api/entities/testimony.entity";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type Props = {
  testimonies: Testimony[];
};

export default function TestimonyCards({ testimonies }: Props) {
  return (
    <div className="flex flex-row flex-wrap md:w-[80%] self-center gap-12 justify-center pb-1 px-1 -mt-16">
      {testimonies.map((t) => (
        <div
          key={t.testimonyId}
          className="max-h-auto w-[300px] lg:w-[350px] xl:w-[450px] 2xl:w-[500px] sm:max-h-[700px] text-center flex flex-col items-center justify-center"
        >
          <Image
            src={
              t.user?.avatarUrl ||
              t.member?.avatarUrl ||
              "/icons/user-defaultb.svg"
            }
            alt=""
            width={100}
            height={100}
            className="rounded-full w-32 z-10 translate-y-16 relative -mt-16"
          />
          <Card
            radius="none"
            shadow="sm"
            className="z-0 relative w-full min-w-[300px] lg:min-w-[360px]"
          >
            <CardBody className="z-0 pt-20 pb-10 flex flex-col gap-5">
              <h4 className="font-comorant font-semibold text-2xl text-center">
                {t.title}
              </h4>
              <p className="font-raleway italic p-2 text-justify">
                {t.content}
              </p>
              <p className="pt-3 pl-5 opacity-70">
                {t.user
                  ? `${t.user.firstName} ${t.user.lastName}, Colombia`
                  : `${t.member?.fistName} ${t.member?.lastName}, Colombia`}{" "}
              </p>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
