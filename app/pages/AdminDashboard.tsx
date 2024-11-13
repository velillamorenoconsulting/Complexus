"use client";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import UsersTable from "../components/dashboard/admin/UsersTable";
import MembersTable from "../components/dashboard/admin/MembersTable";

export default function AdminDashboard() {
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
