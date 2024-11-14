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
import { convertDate, formatPrice } from "@/app/utils/utils";
import Image from "next/image";
import { Question } from "@/app/api/entities/question.entity";
import { Item } from "@/app/api/entities/item.entity";
import { Testimony } from "@/app/api/entities/testimony.entity";

type CompProps = {
  testimonies: Testimony[];
  isLoading: boolean;
};

export default function TestimonyTable({ testimonies, isLoading }: CompProps) {
  const handleContent = (val: string): string => {
    if (val.length > 150) {
      return val.slice(0, 149) + "...";
    }
    return val;
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
              <TableColumn>CONTENIDO</TableColumn>
              <TableColumn>CREADO</TableColumn>
              <TableColumn>USUARIO</TableColumn>
              <TableColumn>APROBADO</TableColumn>
              <TableColumn>PRIORIDAD</TableColumn>
              <TableColumn>ACCION</TableColumn>
            </TableHeader>
            <TableBody className="flex flex-col gap-3">
              {testimonies.map((entity) => (
                <TableRow key={entity.testimonyId} className="font-raleway">
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${entity.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                  </TableCell>
                  <TableCell>{entity.title}</TableCell>
                  <TableCell>{handleContent(entity.content)}</TableCell>
                  <TableCell>{convertDate(entity.createdAt, true)}</TableCell>
                  <TableCell>{entity.user?.email}</TableCell>
                  <TableCell>{entity.isApproved ? "SI" : "NO"}</TableCell>
                  <TableCell>{entity.priority}</TableCell>
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
                        {entity.isDeleted ? (
                          <DropdownItem key="activate">Activar</DropdownItem>
                        ) : (
                          <DropdownItem key="delete">Eliminar</DropdownItem>
                        )}
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
