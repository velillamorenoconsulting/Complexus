import React from "react";
import NavaBar from "./sections/NavaBar";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Footer from "./sections/Footer";

export default function NotFound() {
  return (
    <div className="bg-zinc-800 h-screen">
      <NavaBar style="light" />
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="max-w-[700px] flex flex-col p-5">
          <Image
            src="/thinking.png"
            alt="p_thinking"
            width={500}
            height={500}
            className="w-48 pb-5 self-center"
          />
          <h3 className="font-comorant text-5xl">
            No hemos encontrado nada aquí
          </h3>
          <Divider className="dark my-5" />
          <p className="text-lg font-raleway text-justify">
            Asegúrate que la página a la que quieras dirigirte esté correcta. Si
            esta página funcionaba anteriormente o un enlace te ha traido aquí,
            es probable que esta sección se encuentre en mantenimiento o no
            tengas permiso de ver su contenido.
          </p>
        </div>
      </div>
      <Footer style="dark" />
    </div>
  );
}
