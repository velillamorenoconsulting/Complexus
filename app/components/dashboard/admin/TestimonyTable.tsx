"use client";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
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
import { Testimony } from "@/app/api/entities/testimony.entity";
import { FetchState } from "@/app/types/types";
import useEntityDeletion from "../../hooks/useEntityDeletion";
import { useState } from "react";
import Confirmation from "../../Confirmation";

type CompProps = {
  testimonies: Testimony[];
  isLoading: boolean;
  forceRefetch: React.Dispatch<React.SetStateAction<FetchState<Testimony[]>>>;
};

export default function TestimonyTable({
  testimonies,
  isLoading,
  forceRefetch,
}: CompProps) {
  const [aimedEntity, setAimedEntity] = useState<string | null>(null);
  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);
  const {
    handleDeletion,
    isLoading: deletionLoading,
    entityId,
  } = useEntityDeletion("testimony", "SYSTEM", forceRefetch);
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
                      <DropdownTrigger className="relative">
                        {deletionLoading && entity.testimonyId === entityId ? (
                          <CompLoading hasText={false} loaderSize="sm" />
                        ) : (
                          <Chip className="hover:cursor-pointer">
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
                        {entity.isDeleted ? (
                          <DropdownItem key="review">Ver detalles</DropdownItem>
                        ) : (
                          <DropdownSection>
                            <DropdownItem key="update">Editar</DropdownItem>
                            <DropdownItem key="review">
                              Ver detalles
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              onClick={() => {
                                setDeletionOpen(true);
                                setAimedEntity(entity.testimonyId);
                              }}
                            >
                              Eliminar
                            </DropdownItem>
                          </DropdownSection>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Confirmation
            closingFunction={setDeletionOpen}
            isOpen={deletionOpen}
            closeAction={() => setAimedEntity(null)}
            action={() => handleDeletion(aimedEntity as string)}
            title="¿Está seguro de eliminar este testimonio?"
            text="Aun podrá ver el testimonio en la lista y sus detalles, pero no podrá
                  reestablecerlo. Deberá crearse nuevamente."
          />
        </>
      )}
    </>
  );
}
