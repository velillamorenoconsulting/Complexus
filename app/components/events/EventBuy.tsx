"use client";
import { Event } from "@/app/api/entities/event.entity";
import { SignedAuth, SignedUserResponse } from "@/app/api/types/auth.types";
import { useStore } from "@/app/store/zustand";
import { ServerResponse } from "@/app/types/responses";
import { convertDate, formatPrice, sendAlert } from "@/app/utils/utils";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CompLoading from "../CompLoading";

type Props = {
  event: Event;
};

export default function EventBuy({ event }: Props) {
  const { status, data } = useSession();
  const { setAuthOptions, setUser } = useStore();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [totalCost, setTotalCost] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const user = data?.user as SignedUserResponse;

  const handlePurchase = async () => {
    if (status !== "authenticated") return;
    setLoading(true);
    try {
      await axios.post<ServerResponse<string>>(
        `${process.env.NEXT_PUBLIC_BE_URL}/purchase`,
        {
          tax: "0.0",
          isEvent: true,
          basePrice: totalCost.toString(),
          isMemberPurchase: (data.user as SignedAuth).type === "member",
          buyerId: user.id,
          userBuyer: user.id,
          amount: tickets,
          event: event.eventId,
        },
      );
      setLoading(false);
      setUser(null);
      sendAlert({
        title: "Compra realizada",
        type: "success",
        text: "Ingresa a tu dashboard para ver tus compras",
        timing: 2000,
      });
      onClose();
    } catch {
      setLoading(false);
      sendAlert({
        title: "Hubo un error",
        type: "error",
        text: "Intenta nuevamente en unos minutos. Si el problema continua, notificanos.",
        timing: 2500,
      });
    }
  };

  const handleBuyingButton = () => {
    if (status === "authenticated") {
      onOpen();
    } else {
      window.scrollTo(0, 0);
      setAuthOptions({
        isVisible: true,
        type: "login",
      });
    }
  };
  return (
    <>
      <Button
        className="w-2/3 text-lg underline font-semibold"
        onClick={() => handleBuyingButton()}
      >
        {event.price ? "Comprar" : "Solicitar"}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="dark text-white"
        placement="center"
        size="lg"
        onClose={() => {
          setTotalCost(0);
          setTickets(0);
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
                  Modulo de compra
                </ModalHeader>
                <Divider className="my-3 dark" />
                {isLoading && <CompLoading />}
                <ModalBody className="py-5 px-8 font-raleway flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="font-bold">Titulo del evento:</h3>
                    <p>{event.title}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="font-bold">Fecha del evento:</h3>
                    <p>{convertDate(event.startAt)}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="font-bold">Costo por entrada:</h3>
                    <p>
                      {event.price ? `${formatPrice(event.price)}` : "GRATIS"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold">Cantidad de entradas:</h3>
                    <Select
                      className="max-w-[100px]"
                      label="Cantidad"
                      onSelectionChange={(selected) => {
                        setTotalCost(
                          parseInt(selected.currentKey as string) * event.price,
                        );
                        setTickets(parseInt(selected.currentKey as string));
                      }}
                    >
                      {["1", "2", "3", "4", "5"].map((val) => (
                        <SelectItem key={val} className="dark">
                          {val}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="font-bold">Total a cancelar:</h3>
                    <p>{formatPrice(totalCost)}</p>
                  </div>
                  <div className="p-5 flex flex-row gap-3 w-full justify-center">
                    <Button className="w-1/3" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      className="w-1/3"
                      color="primary"
                      isDisabled={tickets === 0}
                      onPress={() => handlePurchase()}
                    >
                      Comprar
                    </Button>
                  </div>
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
