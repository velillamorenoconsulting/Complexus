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

type ComponentParams = {
  isLoading: boolean;
  users: User[];
};

export default function UsersTable({ isLoading, users }: ComponentParams) {
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
                      <DropdownItem key="update">Editar</DropdownItem>
                      <DropdownItem key="delete">Eliminar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
