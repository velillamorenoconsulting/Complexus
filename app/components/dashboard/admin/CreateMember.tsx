"use client";
import { ValidateMemberForm } from "@/app/utils/entityForms/dashboard";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CompLoading from "../../CompLoading";
import axios from "axios";
import { ServerResponse } from "@/app/types/responses";
import { sendAlert } from "@/app/utils/utils";

export interface CreateMemberForm {
  fullName: string | null;
  email: string | null;
  password: string | null;
  country?: string | null;
}

const initializer: CreateMemberForm = {
  fullName: null,
  email: null,
  password: null,
  country: null,
};

type CompProps = {
  forceRefetch: (val: { refetch: boolean }) => void;
};

export default function CreateMember({ forceRefetch }: CompProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formValues, setFormValues] = useState<CreateMemberForm>(initializer);
  const [errors, setErrors] = useState<CreateMemberForm>(initializer);
  const [loading, isLoading] = useState<boolean>(false);
  const { data, status } = useSession();

  const clearStates = () => {
    setFormValues(initializer);
    setErrors(initializer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setErrors(
      ValidateMemberForm({
        ...formValues,
        [e.target.id]: e.target.value,
      }),
    );
  };

  const handleCreation = async () => {
    if (status !== "authenticated") return;
    try {
      isLoading(true);
      await axios.post<ServerResponse<string>>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
        {
          type: "member",
          firstName: (formValues.fullName as string).split(" ")[0],
          lastName: (formValues.fullName as string).split(" ")[1],
          email: formValues.email,
          country: formValues.country,
          password: formValues.password,
        },
      );
      sendAlert({
        title: "Miembro agregado",
        text: "Debera confirmar el correo electronico para poder ingresar.",
        type: "success",
        timing: 2000,
      });
      onClose();
      clearStates();
      forceRefetch({ refetch: true });
    } catch (e: any) {
      sendAlert({
        title: "Ha ocurrido un error",
        text: "Intenta nuevamente luego. Si el error persiste, contactanos.",
        type: "error",
        timing: 2500,
      });
    } finally {
      isLoading(false);
    }
  };
  return (
    <div className="w-full items-center justify-center">
      <Button className="w-[200px] mt-5" onPress={() => onOpen()}>
        Crear Miembro
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
                Crear Miembro
              </ModalHeader>
              <Divider className="my-3 dark" />
              {loading && <CompLoading />}
              <ModalBody className="py-5 px-8 font-raleway">
                <form className="flex flex-col gap-2">
                  <Input
                    label="Nombre y Apellido"
                    isRequired
                    onChange={handleChange}
                    id="fullName"
                    value={formValues.fullName as string}
                    errorMessage={errors.fullName}
                    isInvalid={!!errors.fullName}
                  />
                  <Input
                    label="Correo"
                    isRequired
                    onChange={handleChange}
                    id="email"
                    value={formValues.email as string}
                    errorMessage={errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Input
                    label="Pais"
                    onChange={handleChange}
                    isRequired
                    id="country"
                    value={formValues.country as string}
                    errorMessage={errors.country}
                    isInvalid={!!errors.country}
                  />
                  <Input
                    type="password"
                    label="Contraseña"
                    isRequired
                    onChange={handleChange}
                    id="password"
                    value={formValues.password as string}
                    errorMessage={errors.password}
                    isInvalid={!!errors.password}
                  />

                  <Button
                    onPress={handleCreation}
                    className="mt-5"
                    color="primary"
                    isDisabled={
                      !formValues.email ||
                      !!errors.email ||
                      !formValues.fullName ||
                      !!errors.fullName ||
                      !!errors.country ||
                      !formValues.country ||
                      !formValues.password ||
                      !!errors.password
                    }
                  >
                    Enviar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
