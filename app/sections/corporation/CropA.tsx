import Image from "next/image";
import React from "react";

export default function CropA() {
  return (
    <div className="w-full h-screen">
      <Image
        src="/corpMain.png"
        alt="bg_corp"
        width={3000}
        height={3000}
        className="h-screen object-cover"
      />
    </div>
  );
}
