"use client";
import { User } from "@/app/api/entities/user.entity";
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
import useEntityDeletion from "../../hooks/useEntityDeletion";
import { TableState } from "@/app/types/types";
import { useState } from "react";
import Confirmation from "../../Confirmation";

type ComponentParams = {
  isLoading: boolean;
  users: User[];
  forceRefetch: TableState<User[]>;
};

export default function UsersTable({
  isLoading,
  users,
  forceRefetch,
}: ComponentParams) {
  const {
    handleDeletion,
    isLoading: userDeleteLoading,
    entityId: deletingId,
  } = useEntityDeletion("user", "SYSTEM", forceRefetch);
  const [aimedEntity, setAimedEntity] = useState<string | null>(null);
  const [deletionOpen, setDeletionOpen] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <CompLoading height="h-1/2" />
      ) : (
        <Table className="dark mt-3">
          <TableHeader>
            <TableColumn> </TableColumn>
            <TableColumn>ID</TableColumn>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>FECHA REGISTRO</TableColumn>
            <TableColumn>PAIS</TableColumn>
            <TableColumn>ACCION</TableColumn>
          </TableHeader>
          <TableBody className="flex flex-col gap-3">
            {users.map((user) => (
              <TableRow key={user.userId} className="font-raleway">
                <TableCell>
                  <div
                    className={`w-2 h-2 rounded-full ${user.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                  ></div>
                </TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{convertDate(user.createdAt)}</TableCell>
                <TableCell>{user.country ?? "-"}</TableCell>
                <TableCell>
                  <Dropdown className="dark" isDisabled={user.isDeleted}>
                    <DropdownTrigger className="relative">
                      {userDeleteLoading && deletingId === user.userId ? (
                        <CompLoading hasText={false} loaderSize="sm" />
                      ) : (
                        <Chip
                          className="hover:cursor-pointer"
                          variant={user.isDeleted ? "bordered" : "solid"}
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
                      <DropdownItem key="update">Editar</DropdownItem>
                      <DropdownItem
                        key="delete"
                        onClick={() => {
                          setAimedEntity(user.userId);
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
      )}
      <Confirmation
        closingFunction={setDeletionOpen}
        isOpen={deletionOpen}
        closeAction={() => setAimedEntity(null)}
        action={() => handleDeletion(aimedEntity as string)}
        title="¿Está seguro de eliminar este usuario?"
        text="Aun podrá ver el usuario en la lista, pero no podrá
                  reestablecerlo. Deberá registrarse nuevamente usando otro correo electronico."
      />
    </>
  );
}
