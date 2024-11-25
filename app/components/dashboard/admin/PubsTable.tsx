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
import { Item } from "@/app/api/entities/item.entity";
import CreatePub from "./CreatePub";
import { FetchState, TableState } from "@/app/types/types";
import useEntityDeletion from "../../hooks/useEntityDeletion";
import { useState } from "react";
import Confirmation from "../../Confirmation";

type CompProps = {
  state: FetchState<Item[]>;
  isLoading: boolean;
  forceRefetch: TableState<Item[]>;
};

export default function PubsTable({
  state,
  isLoading,
  forceRefetch,
}: CompProps) {
  const {
    handleDeletion,
    isLoading: deletionLoading,
    entityId,
  } = useEntityDeletion("items", "SYSTEM", forceRefetch);
  const [isDeletionOpen, setDeletionOpen] = useState<boolean>(false);
  const [aimedEntity, setAimedEntity] = useState<string | null>(null);
  return (
    <>
      {isLoading ? (
        <CompLoading height="h-1/2" />
      ) : (
        <>
          <CreatePub state={state} forceRefetch={forceRefetch} />
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
              {state.value.map((entity) => (
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
                    <Dropdown className="dark" isDisabled={entity.isDeleted}>
                      <DropdownTrigger>
                        {deletionLoading && entityId === entity.itemId ? (
                          <CompLoading hasText={false} loaderSize="sm" />
                        ) : (
                          <Chip
                            className="hover:cursor-pointer"
                            variant={entity.isDeleted ? "bordered" : "solid"}
                          >
                            <Image
                              src="/icons/action.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </Chip>
                        )}
                      </DropdownTrigger>
                      <DropdownMenu className="dark text-white">
                        <DropdownItem key="review">Ver detalles</DropdownItem>
                        <DropdownItem key="update">Editar</DropdownItem>
                        <DropdownItem
                          key="delete"
                          onClick={() => {
                            setAimedEntity(entity.itemId);
                            setDeletionOpen(true);
                          }}
                        >
                          Eliminar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Confirmation
            closingFunction={setDeletionOpen}
            isOpen={isDeletionOpen}
            closeAction={() => setAimedEntity(null)}
            action={() => handleDeletion(aimedEntity as string)}
            title="¿Está seguro de eliminar esta publicacion?"
            text="Aun podrá ver la publicacion en la lista, pero no podrá
                  reestablecerlo. Deberá crearse de nuevo."
          />
        </>
      )}
    </>
  );
}
