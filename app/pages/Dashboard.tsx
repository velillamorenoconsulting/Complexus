"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { useUserSessionStrict } from "../components/hooks/useUserSession";
import { useEffect, useState } from "react";
import UserPreview from "../components/dashboard/UserPreview";
import PurchasesPreview from "../components/dashboard/PurchasesPreview";
import EventsPreview from "../components/dashboard/EventsPreview";
import QuestionsPreview from "../components/dashboard/QuestionsPreview";

export default function Dashboard() {
  const user = useUserSessionStrict();
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!user.loading && user.user) {
      setLoading(false);
    }
  }, [user]);

  const purchases =
    user.user?.purchases?.filter((purchase) => purchase.isConfirmed) ?? [];
  const events = purchases.filter((purchase) => purchase.isEvent);
  const questions = user.user?.questions ?? [];
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
                <UserPreview isLoading={isLoading} user={user.user} />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody>
                <PurchasesPreview isLoading={isLoading} purchases={purchases} />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody className="">
                <EventsPreview isLoading={isLoading} purchases={events} />
              </CardBody>
            </Card>
            <Card className="p-3 bg-zinc-200">
              <CardBody>
                <QuestionsPreview isLoading={isLoading} questions={questions} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
