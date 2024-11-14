"use client";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import UsersTable from "../components/dashboard/admin/UsersTable";
import MembersTable from "../components/dashboard/admin/MembersTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendAlert } from "../utils/utils";
import { SignedMember, SignedUser } from "../api/types/auth.types";
import axios from "axios";
import { ServerResponse } from "../types/responses";
import { Member } from "../api/entities/member.entity";

export default function AdminDashboard() {
  const { status, data } = useSession();
  const route = useRouter();
  const [admin, setAdmin] = useState<Member | null>(null);
  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/");
      sendAlert({
        title: "Deberas iniciar sesión para acceder aquí",
        type: "error",
        timing: 1500,
      });
    }

    if (data?.user) {
      const user = data?.user as SignedMember;
      if (user?.type !== "member") {
        route.push("/");
        sendAlert({
          title: "No tienes acceso a este panel",
          type: "error",
          timing: 1500,
        });
      }
      const verifyAdmin = async () => {
        try {
          const { data } = await axios.get<ServerResponse<Member>>(
            `${process.env.NEXT_PUBLIC_BE_URL}/member/${user.memberId}`,
          );
          setAdmin(data.message);
        } catch (e) {
          console.log(e);
        }
      };
      verifyAdmin();
    }
  }, [status]);

  console.log(admin);

  useEffect(() => {
    if (admin) {
      if (!admin.isAdmin) {
        route.push("/");
        sendAlert({
          title: "No tienes acceso a este panel",
          type: "error",
          timing: 1500,
        });
      }
    }
  }, [admin]);
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
        <Card className="hidden lg:block h-full dark" fullWidth radius="sm">
          <CardBody className="h-full">
            <div className="flex flex-col gap-3">
              <h3 className="font-comorant text-2xl font-bold">Navegación</h3>
              <Tabs variant="light" className="font-raleway w-full">
                <Tab key="users" title="Usuarios">
                  <Divider />
                  <UsersTable refetch={false} />
                </Tab>
                <Tab key="members" title="Miembros">
                  <Divider />
                  <MembersTable />
                </Tab>
                <Tab key="events" title="Eventos" />
                <Divider />

                <Tab key="pubs" title="Publicaciones" />
                <Tab key="testimony" title="Testimonios" />
              </Tabs>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
