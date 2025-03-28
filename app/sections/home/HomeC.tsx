import { getImageUrl } from "@/app/utils/utils";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function HomeC() {
  return (
    <div className="w-full flex flex-col justify-center bg-[#e4cab8] items-center">
      <div className="flex flex-col p-16 max-w-[1600px] gap-16">
        <h2 className="font-comorant text-5xl font-semibold text-center">
          Fundadores
        </h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4">
          <div className="flex flex-col lg:w-1/3 h-full max-w-[500px]">
            <div className="w-full h-[300px] max-w-[400px] overflow-hidden relative self-center">
              <Image
                src={getImageUrl("yeh41wbrk1rwk1owbxo1.png", true)}
                alt="edgar_morin"
                width={800}
                height={800}
                className="w-full transform scale-150 translate-y-14"
              />
            </div>
            <h5 className="font-comorant text-3xl font-semibold text-center pt-5">
              Edgar Morin
            </h5>
            <p className="opacity-80 font-raleway text-center text-xl">
              Alto Patronato
            </p>
            <p className="text-justify font-raleway text-lg px-10 pt-3">
              Filósofo y sociólogo francés. Presidente de la Asociación de
              Pensamiento Complejo. Ex Director de Investigaciones en el Centro
              nacional para la Investigación Científica C.N.R.S. en París, entre
              1.950 y 1.989.
            </p>
            <Divider className="my-8 lg:hidden" />
          </div>
          <div className="flex flex-col lg:w-1/3 h-full max-w-[500px]">
            <div className="w-full h-[300px] max-w-[400px] overflow-hidden relative self-center">
              <Image
                src={getImageUrl("bfvg68l4bne7b0wo7ga6.png", true)}
                alt="edgar_morin"
                width={800}
                height={800}
                className="w-full transform scale-125 lg:scale-[170%] xl:scale-125 translate-y-8"
              />
            </div>
            <h5 className="font-comorant text-3xl font-semibold text-center  pt-5">
              Fernando Savater
            </h5>
            <p className="opacity-80 font-raleway text-center text-xl">
              Alto Patronato
            </p>
            <p className="text-justify font-raleway text-lg px-10 pt-3">
              Filósofo español. Autor de más de 40 libros de ensayo, novelas y
              obras dramáticas.
            </p>
            <Divider className="my-8 lg:hidden" />
          </div>
          <div className="flex flex-col lg:w-1/3 h-full max-w-[500px]">
            <div className="w-full h-[300px] max-w-[400px] overflow-hidden relative self-center">
              <Image
                src={getImageUrl("l3ugwukkeuxahxg96mvo.png", true)}
                alt="edgar_morin"
                width={800}
                height={800}
                className="w-full transform scale-150 lg:scale-[210%] xl:scale-150 pt-8 -translate-x-16"
              />
            </div>
            <h5 className="font-comorant text-3xl font-semibold text-center  pt-5">
              Belisario Betancur
            </h5>
            <p className="opacity-80 font-raleway text-center text-xl">
              Alto Patronato
            </p>
            <p className="text-justify font-raleway text-lg px-10 pt-3">
              Ex Presidente de la República. Presidente de la Fundación
              Santillana para Iberoamérica.
            </p>
            <Divider className="my-8 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
