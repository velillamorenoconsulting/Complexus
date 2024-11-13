"use client";
import { useStore } from "@/app/store/zustand";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CompLoading from "../CompLoading";
import { sendAlert } from "@/app/utils/utils";

export default function CreateTestimony() {
  const { status, data } = useSession();
  const { setAuthOptions, user } = useStore();
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleTestimonyCreateButton = () => {
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
        className="max-w-[200px] text-lg"
        onPress={handleTestimonyCreateButton}
      >
        Escribir Testimonio
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="dark text-white"
        placement="center"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
                Crear Testimonio
              </ModalHeader>
              <Divider className="my-3 dark" />
              {isLoading && <CompLoading />}
              <ModalBody className="py-5 px-8 font-raleway">
                <form className="flex flex-col gap-2">
                  <Input label="Titulo" isRequired />
                  <Textarea label="Contenido" isRequired />
                  <Button className="mt-5" color="primary">
                    Enviar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
