"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import useFormBase from "../hooks/useFormBase";
import { contactFormValidations } from "@/app/utils/userValidations";

export type ContactFormValues = {
  name: string | null;
  subject: string | null;
  reason: string | null;
  message: string | null;
};

const initialState: ContactFormValues = {
  name: null,
  subject: null,
  reason: null,
  message: null,
};

export default function ContactForm() {
  const [formValues, errors, handleChange, isButtonDisabled] =
    useFormBase<ContactFormValues>(initialState, contactFormValidations);
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-1 font-raleway">
        <label>Nombre</label>
        <Input
          type="text"
          radius="sm"
          size="lg"
          onChange={handleChange}
          value={formValues.name as string}
          id="name"
          errorMessage={errors.name}
          isInvalid={!!errors.name}
        />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Asunto</label>
        <Input
          type="text"
          radius="sm"
          size="lg"
          id="subject"
          onChange={handleChange}
          value={formValues.subject as string}
          errorMessage={errors.subject}
          isInvalid={!!errors.subject}
        />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Motivo</label>
        <Input
          type="text"
          radius="sm"
          size="lg"
          onChange={handleChange}
          id="reason"
          value={formValues.reason as string}
          errorMessage={errors.reason}
          isInvalid={!!errors.reason}
        />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Mensaje</label>
        <Textarea
          type="text"
          radius="sm"
          size="lg"
          onChange={handleChange}
          id="message"
          value={formValues.message as string}
          errorMessage={errors.message}
          isInvalid={!!errors.message}
        />
      </div>
      <Button
        isDisabled={isButtonDisabled}
        className="font-raleway font-bold text-lg"
      >
        Enviar
      </Button>
    </div>
  );
}
