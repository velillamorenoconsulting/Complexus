import { getImageUrl } from "@/app/utils/utils";
import Image from "next/image";
import React from "react";

export default function CropA() {
  return (
    <div className="w-full h-screen relative">
      <div className="h-full w-full absolute z-0">
        <Image
          src={getImageUrl("qaa2tq7gvyuzryqhv3zw.png")}
          alt="bg_corp"
          width={3000}
          height={3000}
          className="h-screen object-cover opacity-75"
        />
      </div>
      <div className="h-full justify-center flex flex-col items-end p-10 max-w-[2300px] gap-2">
        <h2 className="text-5xl text-black z-10 w-[80%] md:w-[60%] text-right font-comorant">
          Acerca de nuestra corporación
        </h2>
        <p className="text-lg text-black font-raleway z-10 w-[50%] text-right">
          Corporación para el desarrollo del pensamiento complejo
        </p>
      </div>
    </div>
  );
}
