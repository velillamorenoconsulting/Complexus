"use client";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useUserSessionStrict } from "../components/hooks/useUserSession";
import { useStore } from "../store/zustand";

type PageStatus = "loading" | "done";

export default function Dashboard() {
  const user = useUserSessionStrict();
  console.log(user);
  return (
    <div className="pt-navbar lg:pt-navbard">
      <div className="hidden lg:flex flex-row  h-full lg:h-auto font-raleway">
        <div className="w-[250px] 2xl:w-[400px] flex justify-center items-center hover:cursor-pointer">
          <Image
            src="/icons/dashboard.svg"
            alt="dashboard"
            width={200}
            height={200}
            className="w-10"
          />
        </div>
        <div className="p-4 md:pl-7 2xl:pl-14 text-2xl">Panel</div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:flex-col lg:max-w-[250px] 2xl:max-w-[400px] flex flex-wrap gap-2 p-5 justify-center lg:h-full lg:justify-start w-full">
          <Button>Perfil</Button>
          <Button>Compras</Button>
          <Button>Eventos</Button>
          <Button>Preguntas</Button>
        </div>
        <div className="w-full p-4 2xl:pr-10 h-full">
          <div className="w-full font-raleway h-full rounded-3xl bg-zinc-300 shadow-inner shadow-zinc-300 p-5 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-9">
            <Card className="p-2 bg-zinc-200">
              <CardBody className="overflow-y-hidden">
                <h4 className="text-2xl font-semibold">Tu perfil</h4>
                <Divider className="my-3" />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody>
                <h4 className="text-2xl font-semibold">Últimas compras</h4>
                <Divider className="my-3" />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody>
                <h4 className="text-2xl font-semibold">Tus eventos</h4>
                <Divider className="my-3" />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody>
                <h4 className="text-2xl font-semibold">Preguntas realizadas</h4>
                <Divider className="my-3" />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
