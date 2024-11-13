import { useStore } from "@/app/store/zustand";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CompLoading from "../CompLoading";
import { validateUserQuestionCreation } from "@/app/utils/entityForms";
import { SignedUserResponse } from "@/app/api/types/auth.types";
import axios from "axios";
import { ServerResponse } from "@/app/types/responses";
import { sendAlert } from "@/app/utils/utils";

export interface UserQuestionFormValues {
  questionContent: string | null;
  additionalDescription: string | null;
  isGeneralQuestion: true;
}

type ComponentProps = {
  eventId: string;
};

export default function EventQuestion({ eventId }: ComponentProps) {
  const [formValues, setFormValues] = useState<UserQuestionFormValues>({
    questionContent: null,
    additionalDescription: null,
    isGeneralQuestion: true,
  });
  const [errors, setErrors] = useState<UserQuestionFormValues>({
    questionContent: null,
    additionalDescription: null,
    isGeneralQuestion: true,
  });
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { status, data } = useSession();
  const { setAuthOptions } = useStore();
  const [isLoading, setLoading] = useState<boolean>();
  const user = data?.user as SignedUserResponse;

  const clearStates = () => {
    setFormValues({
      questionContent: null,
      additionalDescription: null,
      isGeneralQuestion: true,
    });
    setErrors({
      questionContent: null,
      additionalDescription: null,
      isGeneralQuestion: true,
    });
  };
  const handleQuestionCreation = async () => {
    if (status !== "authenticated") return;
    try {
      setLoading(true);
      await axios.post<ServerResponse<string>>(
        `${process.env.NEXT_PUBLIC_BE_URL}/question`,
        {
          ...formValues,
          author: user.userId,
          event: eventId,
        },
      );
      onClose();
      setLoading(false);
      clearStates();
      sendAlert({
        title: "Pregunta creada",
        text: "Tu pregunta se ha creado correctamente. Puedes revisarla en tu panel.",
        type: "success",
        timing: 2000,
      });
    } catch (e: any) {
      setLoading(false);
      sendAlert({
        title: "Ha ocurrido un error",
        text: "Intenta nuevamente luego. Si el error persiste, contactanos.",
        type: "error",
        timing: 2500,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(
      validateUserQuestionCreation({
        ...formValues,
        [e.target.id]: e.target.value,
      }),
    );
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };
  const handleCreateQuestionButton = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleQuestionCreation();
  };
  return (
    <>
      <Button className="pl-3 w-1/2" onPress={handleCreateQuestionButton}>
        Preguntar
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
                Crea tu pregunta
              </ModalHeader>
              <Divider className="my-3 dark" />
              {isLoading && <CompLoading />}
              <ModalBody className="py-5 px-8 font-raleway">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <Textarea
                    value={formValues.questionContent as string}
                    isInvalid={!!errors.questionContent}
                    errorMessage={errors.questionContent}
                    id="questionContent"
                    onChange={handleChange}
                    isRequired
                    label="Pregunta"
                    labelPlacement="outside"
                    className="font-raleway"
                    description="Escribe tu pregunta de manera corta. Los detalles los podrás dar más abajo"
                  />
                  <Select
                    isRequired
                    className="dark font-raleway"
                    label="Tipo"
                    description="Todas las preguntas serán generales por ahora."
                  >
                    <SelectItem key="general">General</SelectItem>
                  </Select>
                  <Textarea
                    errorMessage={errors.additionalDescription}
                    isInvalid={!!errors.additionalDescription}
                    value={formValues.additionalDescription as string}
                    label="Detalles adicionales"
                    id="additionalDescription"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    className="mt-5"
                    isDisabled={
                      !formValues.questionContent ||
                      !!errors.additionalDescription ||
                      !!errors.questionContent
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
    </>
  );
}
