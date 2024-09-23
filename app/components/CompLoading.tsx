import { CircularProgress } from "@nextui-org/react";
import React from "react";

export default function CompLoading() {
  return (
    <div className="absolute bg-[#18181B]/70 w-full h-full z-10 flex flex-col justify-center items-center">
      <CircularProgress label="Cargando..." color="default" />
    </div>
  );
}
