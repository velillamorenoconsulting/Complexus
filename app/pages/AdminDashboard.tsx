"use client";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import UsersTable from "../components/dashboard/admin/UsersTable";
import { User } from "../api/entities/user.entity";
import {
  fetchMemberList,
  fetchStateChange,
  fetchUserList,
} from "../utils/fetchFunctions";
import { FetchState } from "../types/types";
import { Member } from "../api/entities/member.entity";
import MembersTable from "../components/dashboard/admin/MembersTable";

const initialState = {
  refetch: true,
  value: [],
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<FetchState<User[]>>(initialState);
  const [members, setMembers] = useState<FetchState<Member[]>>(initialState);
  const [usersLoading, isUsersLoading] = useState<boolean>(false);
  const [membersLoading, isMembersLoading] = useState<boolean>(false);

  useEffect(() => {
    if (users.refetch) {
      fetchUserList(setUsers, isUsersLoading);
    } else if (members.refetch) {
      fetchMemberList(setMembers, isMembersLoading);
    }
  }, [users, members]);

  return (
    <div className="min-h-screen pt-navbar lg:pt-navbard px-10 pb-5 flex w-full h-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3 lg:hidden self-center text-center text-black h-full items-center justify-center">
          <p className="font-raleway text-2xl">
            El panel de administracion no esta disponible en este tamaño de
            pantalla.
          </p>
          <p className="italic font-raleway text-xl text-center opacity-60">
            Por favor cambia el dispositivo para poder administrar la pagina
          </p>
        </div>
        <Card className="hidden lg:block h-full dark " fullWidth radius="sm">
          <CardBody className="h-full">
            <div className="flex flex-col gap-3">
              <h3 className="font-comorant text-2xl font-bold pt-5 pl-5">
                Navegación
              </h3>
              <Tabs variant="light" className="font-raleway w-full dark">
                <Tab key="users" title="Usuarios">
                  <Divider />
                  <UsersTable users={users.value} isLoading={usersLoading} />
                </Tab>
                <Tab key="members" title="Miembros">
                  <Divider />
                  <MembersTable
                    isLoading={membersLoading}
                    forceRefetch={setMembers}
                    state={members}
                  />
                </Tab>
                <Tab key="events" title="Eventos">
                  <Divider />
                </Tab>

                <Tab key="pubs" title="Publicaciones">
                  <Divider />
                </Tab>
                <Tab key="testimony" title="Testimonios">
                  <Divider />
                </Tab>
              </Tabs>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
