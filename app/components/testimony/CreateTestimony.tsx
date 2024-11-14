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
import { stringOnlyRegex } from "@/app/utils";
import { validateLength } from "@/app/utils/functionValidators";
import useFormBase from "../hooks/useFormBase";

type TestimonyFormValues = {
  title: string | null;
  content: string | null;
};

const initializer: TestimonyFormValues = {
  title: null,
  content: null,
};

const validations = {
  title: [
    {
      regex: stringOnlyRegex,
      condition: (val: string) => validateLength(val, 3, 30),
      failedMessage: "El titulo es incorrecto",
    },
  ],
  content: [
    {
      condition: (val: string) => validateLength(val, 10, 200),
      failedMessage: "El contenido es muy corto o muy extenso.",
    },
  ],
};

export default function CreateTestimony() {
  const { status, data } = useSession();
  const { setAuthOptions, user } = useStore();
  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formValues, formErrors, handleChange, buttonDisabled] =
    useFormBase<TestimonyFormValues>(initializer, validations);

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
                  <Input
                    id="title"
                    label="Titulo"
                    isRequired
                    value={formValues.title as string}
                    onChange={handleChange}
                    errorMessage={formErrors.title}
                    isInvalid={!!formErrors.title}
                  />
                  <Textarea
                    id="content"
                    label="Contenido"
                    isRequired
                    value={formValues.content as string}
                    onChange={handleChange}
                    errorMessage={formErrors.content}
                    isInvalid={!!formErrors.content}
                  />
                  <Button
                    className="mt-5"
                    color="primary"
                    isDisabled={buttonDisabled}
                  >
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
