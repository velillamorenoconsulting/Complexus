import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function LoadingBoard() {
  return (
    <div className="flex h-screen flex-col gap-12">
      <div className="flex flex-row w-1/2 h-10 gap-5">
        <Skeleton className="w-1/3 h-full"></Skeleton>
        <Skeleton className="w-1/3 h-full"></Skeleton>
      </div>
      <h3 className="font-comorant font-bold text-4xl italic text-center">
        Recopilando información...
      </h3>
      <div className="flex flex-col lg:flex-row h-1/3 justify-center items-center gap-7">
        <div className="flex flex-col w-1/2 gap-3">
          <Skeleton className="w-full h-10 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-24 rounded-lg mb-7"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
        </div>
        <Skeleton className="w-[25%] h-[70%] rounded-lg"></Skeleton>
      </div>
      <div className="flex flex-col lg:flex-row h-1/3 justify-center items-center gap-7">
        <div className="flex flex-col w-1/2 gap-3">
          <Skeleton className="w-full h-10 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-24 rounded-lg mb-7"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
          <Skeleton className="w-full h-5 rounded-lg"></Skeleton>
        </div>
        <Skeleton className="w-[25%] h-[70%] rounded-lg"></Skeleton>
      </div>
    </div>
  );
}
