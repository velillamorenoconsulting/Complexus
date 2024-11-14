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

type CompProps = {
  events: Event[];
  isLoading: boolean;
};

export default function EventsTable({ events, isLoading }: CompProps) {
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
              {events.map((event) => (
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
                    <Dropdown className="dark">
                      <DropdownTrigger>
                        <Chip className="hover:cursor-pointer">
                          <Image
                            src="/icons/action.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-4 h-4"
                          />
                        </Chip>
                      </DropdownTrigger>
                      <DropdownMenu className="dark text-white">
                        <DropdownItem key="review">Ver detalles</DropdownItem>
                        <DropdownItem key="update">Editar</DropdownItem>
                        <DropdownItem key="delete">Eliminar</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
