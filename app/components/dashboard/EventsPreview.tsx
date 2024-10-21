import { Purchase } from "@/app/api/entities/purchase.entity";
import { Divider, Skeleton } from "@nextui-org/react";
import EventMiniCard from "./EventMiniCard";

type ComponentProps = { isLoading: boolean; purchases: Purchase[] };

export default function EventsPreview({
  isLoading,
  purchases,
}: ComponentProps) {
  const validEventList = purchases
    .map((purchase) => purchase.event!)
    .filter((event) => new Date(event.startAt) > new Date());
  return (
    <div>
      <h4 className="text-2xl font-semibold">Tus próximos eventos</h4>
      <Divider className="my-3" />
      {isLoading ? (
        <div className="flex flex-col gap-3 my-5">
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
        </div>
      ) : validEventList.length ? (
        <div className="flex flex-col gap-3">
          {validEventList.map((event) => (
            <EventMiniCard event={event} />
          ))}
        </div>
      ) : (
        <p className="font-raleway text-md opacity-70">
          No tienes eventos proximos agendados.
        </p>
      )}
    </div>
  );
}
