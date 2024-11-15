"use client";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import CompLoading from "../../CompLoading";
import { convertDate } from "@/app/utils/utils";
import Image from "next/image";
import { Event } from "@/app/api/entities/event.entity";
import { FetchState } from "@/app/types/types";
import CreateEvent from "./CreateEvent";
import ActionButton from "./EventActionButton";

type CompProps = {
  state: FetchState<Event[]>;
  isLoading: boolean;
  forceRefetch: (disp: FetchState<Event[]>) => void;
};

export default function EventsTable({
  state,
  isLoading,
  forceRefetch,
}: CompProps) {
  const cropEventTitle = (title: string): string => {
    if (title.length > 40) {
      return title.slice(0, 39) + "...";
    }
    return title;
  };

  return (
    <>
      {isLoading ? (
        <CompLoading height="h-1/2" />
      ) : (
        <>
          <CreateEvent state={state} forceRefetch={forceRefetch} />
          <Table className="dark mt-3">
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn>TITULO</TableColumn>
              <TableColumn>INICIA</TableColumn>
              <TableColumn>FINALIZADO</TableColumn>
              <TableColumn>CREADO</TableColumn>
              <TableColumn>REGISTROS</TableColumn>
              <TableColumn>ACCION</TableColumn>
            </TableHeader>
            <TableBody className="flex flex-col gap-3">
              {state.value.map((event) => (
                <TableRow key={event.eventId} className="font-raleway">
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${event.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                  </TableCell>
                  <TableCell>{cropEventTitle(event.title)}</TableCell>
                  <TableCell>{convertDate(event.startAt, true)}</TableCell>
                  <TableCell>
                    {new Date(event.startAt) > new Date() ? "NO" : "SI"}
                  </TableCell>
                  <TableCell>{convertDate(event.createdAt)}</TableCell>
                  <TableCell>{event.purchases.length}</TableCell>
                  <TableCell>
                    <ActionButton
                      forceRefetch={forceRefetch}
                      state={state}
                      entityId={event.eventId}
                      isDeleted={event.isDeleted}
                      path="event"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
