"use client";
import { FetchState } from "@/app/types/types";
import { sendAlert } from "@/app/utils";
import { deleteRecord, Entity } from "@/app/utils/changeDeletionState";
import { useState } from "react";

export type DeletionFunction = (id: string) => Promise<void>;

export default function useEntityDeletion<T>(
  entity: Entity,
  updater: string,
  refetchFunction: React.Dispatch<React.SetStateAction<FetchState<T>>>,
): {
  handleDeletion: DeletionFunction;
  isLoading: boolean;
  entityId: string | null;
} {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [entityId, setEntityId] = useState<string | null>(null);
  const handleDeletion: DeletionFunction = async (id: string) => {
    setEntityId(id);
    setLoading(true);
    const result = await deleteRecord(entity, id, updater);
    if (result.status === 200) {
      sendAlert({
        type: "success",
        timing: 1500,
        title: "La entidad se ha eliminado con exito",
      });
      refetchFunction((state) => {
        return {
          ...state,
          refetch: true,
        };
      });
    } else {
      sendAlert({
        type: "error",
        timing: 2500,
        title: "Ha ocurrido un error",
        text: "Intentalo de nuevo luego.",
      });
    }
    setEntityId(null);
    setLoading(false);
  };

  return { handleDeletion, isLoading, entityId };
}
