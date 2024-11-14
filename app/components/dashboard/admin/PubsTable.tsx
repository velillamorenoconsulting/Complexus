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

type CompProps = {
  items: Item[];
  isLoading: boolean;
};

export default function PubsTable({ items, isLoading }: CompProps) {
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
              <TableColumn>CREADA</TableColumn>
              <TableColumn>PRECIO</TableColumn>
              <TableColumn>CANTIDAD</TableColumn>
              <TableColumn>COMPRAS</TableColumn>
              <TableColumn>ACCION</TableColumn>
            </TableHeader>
            <TableBody className="flex flex-col gap-3">
              {items.map((entity) => (
                <TableRow key={entity.itemId} className="font-raleway">
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${entity.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                  </TableCell>
                  <TableCell>{entity.title}</TableCell>
                  <TableCell>{convertDate(entity.createdAt, true)}</TableCell>
                  <TableCell>{formatPrice(entity.price)}</TableCell>
                  <TableCell>{entity.stock}</TableCell>
                  <TableCell>{entity.purchases.length}</TableCell>
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
