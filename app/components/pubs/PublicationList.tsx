"use client";
import { Item } from "@/app/api/entities/item.entity";
import { useStore } from "@/app/store/zustand";
import { getImageUrl } from "@/app/utils/utils";
import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type Props = {
  items: Item[];
};

export default function PublicationList({ items }: Props) {
  const { itemList, setItems } = useStore();
  if (!itemList.length && items.length) {
    setItems(items);
  }
  return (
    <div className="flex flex-col px-10 py-20 justify-center">
      {items.map((item) => (
        <div className="flex flex-col" key={item.itemId}>
          <div className="p-5 flex flex-col lg:flex-row gap-3 justify-evenly">
            <div className="w-full lg:w-[20%] flex items-center justify-center">
              <Image
                width={100}
                height={100}
                src={item.images[0] ? getImageUrl(item.images[0]) : ""}
                alt={item.itemId}
                className="w-[80%] max-w-[200px] h-full max-h-[300px]"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-3">
              <h4 className="max-w-[80%] font-comorant text-3xl lg:text-4xl italic">
                {item.title}
              </h4>
              <p className="font-raleway text-md lg:text-lg text-justify">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 p-3 w-full lg:w-[17%] font-raleway">
              <Button className="w-[80%] lg:w-full">Obtener</Button>
              <Button className="w-[80%] lg:w-full">Detalles</Button>
            </div>
          </div>
          <Divider className="my-7 dark w-[80%] self-center" />
        </div>
      ))}
    </div>
  );
}
