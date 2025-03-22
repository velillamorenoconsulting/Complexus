import { getImageUrl, removeStringValueFromArray } from "@/app/utils";
import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
  imageList: string[];
  setImageFunction: (disp: string[]) => void;
};

export default function ImageList({ imageList, setImageFunction }: Props) {
  const handleRemoval = (removed: string) => {
    setImageFunction([...removeStringValueFromArray(imageList, removed)]);
  };
  return (
    <div className="flex flex-row flex-wrap gap-3 py-5 px-3">
      {imageList.map((imageSource, idx) => (
        <div className="relative" key={`${imageSource}-${idx}`}>
          <div
            className="absolute top-0 right-2 z-20 hover:cursor-pointer text-center font-raleway font-bold"
            onClick={() => handleRemoval(imageSource)}
          >
            x
          </div>
          <Image src={getImageUrl(imageSource)} width={80} />
        </div>
      ))}
    </div>
  );
}
