"use client";
import PublicationList from "@/app/components/pubs/PublicationList";
import { useStore } from "@/app/store/zustand";
import React from "react";
import PublicationsBF from "./PublicationsBF";

export default function PublicationsB() {
  const { itemList } = useStore();
  if (itemList.length) {
    return <PublicationList items={itemList} />;
  } else {
    return <PublicationsBF />;
  }
}
