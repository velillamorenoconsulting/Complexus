import axios from "axios";

export type Entity =
  | "event"
  | "items"
  | "member"
  | "question"
  | "testimony"
  | "user";
export type DeletionResponse =
  | {
      status: 200;
    }
  | { status: 400; message: string };

export async function deleteRecord(
  entity: Entity,
  entityId: string,
  actor?: string,
): Promise<DeletionResponse> {
  const constructUrl = `${process.env.NEXT_PUBLIC_BE_URL}/${entity}`;
  const body = {
    id: entityId,
    updatedBy: actor || "SYSTEM",
  };
  try {
    await axios.delete(constructUrl, { data: body });
    return { status: 200 };
  } catch (e: any) {
    return { status: 400, message: e.message };
  }
}
