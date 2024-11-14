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
import { Question } from "@/app/api/entities/question.entity";

type CompProps = {
  questions: Question[];
  isLoading: boolean;
};

export default function QuestionsTable({ questions, isLoading }: CompProps) {
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
