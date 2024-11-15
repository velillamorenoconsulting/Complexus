"use client";
import { ServerResponse } from "@/app/types/responses";
import { sendAlert } from "@/app/utils";
import axios from "axios";
import React from "react";

type InputDefinition = {
  type: "input" | "textarea";
};
type ModalValues = {};
const modalValues = {};

export default function useCreateEntityButton<T>(
  values: Partial<T>,
  entity: string,
): React.ReactElement {
  const handleEntityCreation = () => {
    const url = `${process.env.NEXT_PUBLIC_BE_URL}/${entity}`;
    try {
      const result = axios.post<ServerResponse<string>>(url, values);
    } catch (e) {
      console.log(e);
      sendAlert({
        title: "Hubo un problema",
        type: "error",
        text: `No se pudo procesar la peticion. Por favor intente mas tarde`,
        timing: 2000,
      });
    }
  };
  return <div>useCreateEntityButton</div>;
}
