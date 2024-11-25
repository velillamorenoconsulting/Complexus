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
import { Question } from "@/app/api/entities/question.entity";
import useEntityDeletion from "../../hooks/useEntityDeletion";
import { TableState } from "@/app/types/types";
import { useState } from "react";
import Confirmation from "../../Confirmation";

type CompProps = {
  questions: Question[];
  isLoading: boolean;
  forceRefetch: TableState<Question[]>;
};

export default function QuestionsTable({
  questions,
  isLoading,
  forceRefetch,
}: CompProps) {
  const {
    handleDeletion,
    isLoading: deletionLoading,
    entityId: deletingId,
  } = useEntityDeletion("question", "SYSTEM", forceRefetch);
  const [aimedEntity, setAimedEntity] = useState<string | null>(null);
  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);
  return (
    <>
      {isLoading ? (
        <CompLoading height="h-1/2" />
      ) : (
        <>
          <Table className="dark mt-3">
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn>CONTENIDO</TableColumn>
              <TableColumn>CREADA</TableColumn>
              <TableColumn>AUTOR</TableColumn>
              <TableColumn>APROBADA</TableColumn>
              <TableColumn>RESPUESTA</TableColumn>
              <TableColumn>ACCION</TableColumn>
            </TableHeader>
            <TableBody className="flex flex-col gap-3">
              {questions.map((entity) => (
                <TableRow key={entity.questionId} className="font-raleway">
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${entity.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                  </TableCell>
                  <TableCell>{entity.questionContent}</TableCell>
                  <TableCell>{convertDate(entity.createdAt, true)}</TableCell>
                  <TableCell>{entity.author.email}</TableCell>
                  <TableCell>{entity.isApproved ? "SI" : "NO"}</TableCell>
                  <TableCell>
                    {entity.response ? entity.response : "Sin respuesta aún"}
                  </TableCell>
                  <TableCell>
                    <Dropdown className="dark">
                      <DropdownTrigger>
                        {deletionLoading && entity.questionId === deletingId ? (
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
                            <DropdownItem
                              key="delete"
                              onClick={() => {
                                setDeletionOpen(true);
                                setAimedEntity(entity.questionId);
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
            title="¿Está seguro de eliminar esta pregunta?"
            text="Aun podrá ver la pregunta en la lista y sus detalles, pero no podrá
                  reestablecerla. Deberá crearse nuevamente."
          />
        </>
      )}
    </>
  );
}
