import { useStore } from "@/app/store/zustand";
import {
  Button,
  Divider,
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
import { SignedUserResponse } from "@/app/api/types/auth.types";
import axios from "axios";
import { ServerResponse } from "@/app/types/responses";
import { sendAlert } from "@/app/utils/utils";
import useFormBase from "../hooks/useFormBase";
import { eventQuestionValidation } from "@/app/utils/userValidations";

export type UserQuestionFormValues = {
  questionContent: string | null;
  additionalDescription: string | null;
};

type ComponentProps = {
  eventId: string;
};

const initializer: UserQuestionFormValues = {
  questionContent: null,
  additionalDescription: null,
};

export default function EventQuestion({ eventId }: ComponentProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { formValues, formErrors, handleChange, clearForm } =
    useFormBase<UserQuestionFormValues>(initializer, eventQuestionValidation);
  const { status, data } = useSession();
  const { setAuthOptions } = useStore();
  const [isLoading, setLoading] = useState<boolean>();
  const user = data?.user as SignedUserResponse;

  const handleQuestionCreation = async () => {
    if (status !== "authenticated") return;
    try {
      setLoading(true);
      await axios.post<ServerResponse<string>>(
        `${process.env.NEXT_PUBLIC_BE_URL}/question`,
        {
          ...formValues,
          isGeneralQuestion: true,
          author: user.id,
          event: eventId,
        },
      );
      onClose();
      setLoading(false);
      clearForm();
      sendAlert({
        title: "Pregunta creada",
        text: "Tu pregunta se ha creado correctamente. Puedes revisarla en tu panel.",
        type: "success",
        timing: 2000,
      });
    } catch {
      setLoading(false);
      sendAlert({
        title: "Ha ocurrido un error",
        text: "Intenta nuevamente luego. Si el error persiste, contactanos.",
        type: "error",
        timing: 2500,
      });
    }
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
          {() => (
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
                    isInvalid={!!formErrors.questionContent}
                    errorMessage={formErrors.questionContent}
                    id="questionContent"
                    onChange={handleChange}
                    isRequired
                    label="Pregunta"
                    labelPlacement="outside"
                    className="font-raleway"
                    description="Escribe tu pregunta de manera corta. Los detalles los podrás dar más abajo"
                  />
                  {/* <Select
                    isRequired
                    className="dark font-raleway"
                    label="Tipo"
                    description="Todas las preguntas serán generales por ahora."
                  >
                    <SelectItem key="general">General</SelectItem>
                  </Select> */}
                  <Textarea
                    errorMessage={formErrors.additionalDescription}
                    isInvalid={!!formErrors.additionalDescription}
                    value={formValues.additionalDescription as string}
                    label="Detalles adicionales"
                    id="additionalDescription"
                    onChange={handleChange}
                    description="Todas las preguntas serán generales por ahora."
                  />
                  <Button
                    type="submit"
                    color="primary"
                    className="mt-5"
                    isDisabled={
                      !formValues.questionContent ||
                      !!formErrors.additionalDescription ||
                      !!formErrors.questionContent
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
