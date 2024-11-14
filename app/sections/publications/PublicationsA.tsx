import { getImageUrl } from "@/app/utils/utils";
import React from "react";

type Props = {};

export default function PublicationsA({}: Props) {
  const bgImage = getImageUrl("yjfifgaforokxng6onl0.jpg");
  return (
    <div
      className={`h-[450px] text-center flex flex-col pt-32 lg:pt-44 items-center justify-center w-full bg-[url('https://res.cloudinary.com/dmebd5bdc/image/upload/v1730082135/Complexus/Pagina%20Web/yjfifgaforokxng6onl0.jpg')]`}
    >
      <h2 className="font-comorant text-3xl lg:text-5xl font-semibold">
        Publicaciones
      </h2>
      <p className="text-xl font-raleway">Un mundo de conocimiento</p>
    </div>
  );
}
