import { CircularProgress } from "@nextui-org/react";
import React from "react";

type CompProps = {
  hasBackground?: boolean;
  height?: string;
};

export default function CompLoading({
  hasBackground = true,
  height,
}: CompProps) {
  return (
    <div
      className={`absolute ${hasBackground ? "bg-[#18181B]/70" : ""} w-full ${height ? height : "h-full"} z-10 flex flex-col justify-center items-center font-raleway`}
    >
      <CircularProgress label="Cargando..." color="default" />
    </div>
  );
}
