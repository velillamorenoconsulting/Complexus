"use client";
import { User } from "@/app/api/entities/user.entity";
import { ServerResponse } from "@/app/types/responses";
import {
  Button,
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
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import CompLoading from "../../CompLoading";
import { convertDate } from "@/app/utils/utils";
import Image from "next/image";

type CompProps = {
  refetch: boolean;
};

export default function UsersTable({ refetch }: CompProps) {
  const [userList, setUserList] = useState<User[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [loading, isLoading] = useState<boolean>(false);

  useEffect(() => {
    isLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get<ServerResponse<User[]>>(
          `${process.env.NEXT_PUBLIC_BE_URL}/user`,
        );
        setUserList(data.message);
      } catch (e) {
        if (e instanceof AxiosError) {
          setGeneralError(e.message);
        }
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, [refetch]);
  return (
    <>
      {loading ? (
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
            {userList.map((user) => (
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
