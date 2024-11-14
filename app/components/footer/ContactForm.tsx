"use client";
import { ThemeType } from "@/app/types/types";
import { Button, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import useFormBase from "../hooks/useFormBase";
import { footerContactFormValidations } from "@/app/utils/userValidations";

type Props = { style: ThemeType };

export type FooterFormValues = {
  subject: string | null;
  message: string | null;
};

const initializer: FooterFormValues = {
  subject: null,
  message: null,
};

export default function ContactForm({ style }: Props) {
  const [formValues, formErrors, handleChange, isButtonDisabled] = useFormBase(
    initializer,
    footerContactFormValidations,
  );
  return (
    <div className="flex flex-col lg:max-w-[400px] w-full">
      <h4 className="font-comorant text-3xl pb-2">Contacto</h4>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <label className="font-raleway">Asunto:</label>
          <Input
            id="subject"
            radius="sm"
            onChange={handleChange}
            value={formValues.subject as string}
            className={style === "dark" ? "dark" : ""}
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Textarea
            id="message"
            radius="sm"
            placeholder="Mensaje"
            onChange={handleChange}
            value={formValues.message as string}
            className={style === "dark" ? "dark" : ""}
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            className={`${style === "light" ? "dark" : ""}`}
            isDisabled={isButtonDisabled}
          >
            Enviar
          </Button>
          <p>ó</p>
          <Image
            src={`/icons/social/${
              style === "dark" ? "whatsapp_dark.svg" : "whatsapp.svg"
            }`}
            alt="x"
            width={50}
            height={50}
            className="w-7 hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
