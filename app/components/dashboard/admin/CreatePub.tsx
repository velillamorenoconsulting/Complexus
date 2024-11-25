"use client";
import { Item } from "@/app/api/entities/item.entity";
import { FetchState } from "@/app/types/types";
import {
  Button,
  Divider,
  Modal,
  Input,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

type Props = {
  state: FetchState<Item[]>;
  forceRefetch: (disp: FetchState<Item[]>) => void;
};

export type CreatePubForm = {
  title: string;
  description: string;
  price: string;
  stock: string;
};

const initializer: CreatePubForm = {
  title: "",
  description: "",
  price: "",
  stock: "",
};

import React, { useState } from "react";
import useFormBase from "../../hooks/useFormBase";
import { createPubValidations } from "@/app/utils/admValidations";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sendAlert } from "@/app/utils";
import CompLoading from "../../CompLoading";

export default function CreatePub({ state, forceRefetch }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { formValues, formErrors, handleChange, isButtonDisabled, clearForm } =
    useFormBase(initializer, createPubValidations);
  const [loading, isLoading] = useState<boolean>();
  const { data, status } = useSession();

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "authenticated") return;
    try {
      isLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/items`, {
        title: formValues.title,
        itemType: "book",
        description: formValues.description,
        price: formValues.price,
        stock: parseInt(formValues.stock),
        images: [],
        additionalDescription: [],
      });
      sendAlert({
        title: "Publicacion creada",
        text: "Ve al panel de edicion para agregar mayor informacion e imagenes.",
        type: "success",
        timing: 2000,
      });
      onClose();
      clearForm();
      forceRefetch({ ...state, refetch: true });
    } catch (e) {
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
        Crear Publicacion
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="dark text-white"
        placement="center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
                Crear Publicacion
              </ModalHeader>
              <Divider className="my-3 dark" />
              {loading && <CompLoading />}
              <ModalBody className="py-5 px-8 font-raleway">
                <form className="flex flex-col gap-2" onSubmit={handleCreation}>
                  <Input
                    label="Titulo"
                    isRequired
                    onChange={handleChange}
                    id="title"
                    value={formValues.title as string}
                    errorMessage={formErrors.title}
                    isInvalid={!!formErrors.title}
                  />
                  <Textarea
                    label="Descripcion"
                    isRequired
                    onChange={handleChange}
                    id="description"
                    value={formValues.description as string}
                    errorMessage={formErrors.description}
                    isInvalid={!!formErrors.description}
                  />
                  <Input
                    label="Precio"
                    isRequired
                    onChange={handleChange}
                    id="price"
                    value={formValues.price as string}
                    errorMessage={formErrors.price}
                    isInvalid={!!formErrors.price}
                  />
                  <Input
                    label="Cantidad"
                    isRequired
                    onChange={handleChange}
                    id="stock"
                    value={formValues.stock as string}
                    errorMessage={formErrors.stock}
                    isInvalid={!!formErrors.stock}
                  />
                  <Button
                    type="submit"
                    className="mt-5"
                    color="primary"
                    isDisabled={isButtonDisabled}
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
