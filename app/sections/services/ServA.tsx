import { getImageUrl } from "@/app/utils/utils";
import Image from "next/image";
import React from "react";

export default function ServA() {
  return (
    <div className="w-full h-screen relative">
      <div className="h-full w-full absolute z-0">
        <Image
          src={getImageUrl("sfnrt4iiingpfnr3of8l.png", true)}
          alt="bg_corp"
          width={3000}
          height={3000}
          className="h-screen object-cover brightness-[0.65] contrast-[1.35]"
        />
      </div>
      <div className="h-full justify-center flex flex-col items-end p-10 max-w-[2300px] gap-2">
        <h2 className="text-5xl text-white z-10 w-[80%] md:w-[60%] text-right font-comorant">
          Servicios de la Corporación
        </h2>
        <p className="text-lg text-white font-raleway z-10 w-[50%] text-right hidden lg:block">
          Complexus ofrece servicios integrales en los sectores académico,
          empresarial, editorial, comunicación y realización de eventos. Se
          especializa en la organización de eventos académicos y empresariales,
          producción de material editorial, diseño de estrategias de
          comunicación, y logística de eventos, desde el montaje hasta la
          seguridad y la producción audiovisual. Además, gestiona el cierre de
          eventos con informes finales y edición de memorias.
        </p>
      </div>
    </div>
  );
}
