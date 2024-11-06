"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";

export default function ContactForm() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-1 font-raleway">
        <label>Nombre</label>
        <Input type="text" radius="sm" size="lg" />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Asunto</label>
        <Input type="text" radius="sm" size="lg" />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Motivo</label>
        <Input type="text" radius="sm" size="lg" />
      </div>
      <div className="flex flex-col gap-1 font-raleway">
        <label>Mensaje</label>
        <Textarea type="text" radius="sm" size="lg" />
      </div>
      <Button isDisabled className="font-raleway font-bold text-lg">
        Enviar
      </Button>
    </div>
  );
}
