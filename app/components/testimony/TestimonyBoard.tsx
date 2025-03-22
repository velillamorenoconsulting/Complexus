import { TestimonyListResponse } from "@/app/types/responses";
import axios from "axios";
import React from "react";
import TestimonyCards from "./TestimonyCards";
import ErrorComp from "../ErrorComp";

export default async function TestimonyBoard() {
  try {
    const { data } = await axios.get<TestimonyListResponse>(
      `${process.env.NEXT_PUBLIC_BE_URL}/testimony?priority=1`,
    );
    return (
      <div className="md:py-10 w-full h-full flex justify-center">
        <TestimonyCards testimonies={data.message} />
      </div>
    );
  } catch (e: any) {
    return <ErrorComp details="General error" />;
  }
}
