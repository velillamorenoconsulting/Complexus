import { Item } from "@/app/api/entities/item.entity";
import ErrorComp from "@/app/components/ErrorComp";
import PublicationList from "@/app/components/pubs/PublicationList";
import { ServerResponse } from "@/app/types/responses";
import axios from "axios";
import React from "react";

export default async function PublicationsBF() {
  try {
    const { data } = await axios.get<ServerResponse<Item[]>>(
      `${process.env.NEXT_PUBLIC_BE_URL}/items`,
    );

    return <PublicationList items={data.message} />;
  } catch (e) {
    return <ErrorComp />;
  }
}
