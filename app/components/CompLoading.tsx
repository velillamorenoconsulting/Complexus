import { CircularProgress } from "@nextui-org/react";
import React from "react";

type CompProps = {
  hasBackground?: boolean;
  height?: string;
  hasText?: boolean;
  loaderSize?: "sm" | "md" | "lg";
};

export default function CompLoading({
  hasBackground = true,
  height,
  hasText = true,
  loaderSize = "md",
}: CompProps) {
  return (
    <div
      className={`z-30 absolute ${hasBackground ? "bg-[#18181B]/70" : ""} w-full ${height ? height : "h-full"} z-10 flex flex-col justify-center items-center font-raleway`}
    >
      <CircularProgress
        label={hasText ? "Cargando..." : ""}
        color="default"
        size={loaderSize}
      />
    </div>
  );
}
