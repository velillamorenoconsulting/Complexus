import { Divider, Skeleton } from "@nextui-org/react";
import React from "react";

export default function EventLoading() {
  return (
    <div className="bg-[#22302f] min-h-screen px-10 flex">
      <div className="pt-32 lg:pt-44 flex flex-col w-full">
        <div className="flex flex-col 2xl:flex-row md:p-10 gap-8 lg:gap-16">
          <div className="w-full 2xl:w-1/2 flex flex-col gap-3">
            <Skeleton className="dark rounded-xl">
              <div className="h-20 w-full"></div>
            </Skeleton>
            <div className="flex flex-col gap-1">
              <Skeleton className="flex flex-col dark gap-2 rounded-xl h-10"></Skeleton>
              <Skeleton className="flex flex-col dark gap-2 rounded-xl h-10"></Skeleton>
            </div>
            <Divider className="my-3 dark" />
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((_, idx) => (
                <Skeleton key={idx} className="h-32 rounded-xl dark" />
              ))}
            </div>
            <p className="font-raleway text-lg text-justify">{}</p>
          </div>
          <div className="flex justify-center 2xl:w-1/2 w-full items-center h-full pb-16">
            <Skeleton className="w-full h-[600px] dark rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
