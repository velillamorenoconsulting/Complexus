"use client";
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
import { Member } from "@/app/api/entities/member.entity";
import CreateMember from "./CreateMember";

export default function EventsTable() {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [loading, isLoading] = useState<boolean>(false);
  const [refetch, forceRefetch] = useState({ refetch: true });

  useEffect(() => {
    isLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get<ServerResponse<Member[]>>(
          `${process.env.NEXT_PUBLIC_BE_URL}/event`,
        );
        setMemberList(data.message);
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
        <>
          {/* <CreateMember state={state} forceRefetch={forceRefetch} /> */}
          <Table className="dark mt-3">
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn>ID</TableColumn>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>FECHA REGISTRO</TableColumn>
              <TableColumn>ADMIN</TableColumn>
              <TableColumn>ACCION</TableColumn>
            </TableHeader>
            <TableBody className="flex flex-col gap-3">
              {memberList.map((member) => (
                <TableRow key={member.memberId} className="font-raleway">
                  <TableCell>
                    <div
                      className={`w-2 h-2 rounded-full ${member.isDeleted ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                  </TableCell>
                  <TableCell>{member.memberId}</TableCell>
                  <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{convertDate(member.createdAt)}</TableCell>
                  <TableCell>{member.isAdmin ? "SI" : "NO"}</TableCell>
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
        </>
      )}
    </>
  );
}
