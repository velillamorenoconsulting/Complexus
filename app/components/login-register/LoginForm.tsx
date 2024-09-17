"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { validateLoginErrors } from "@/app/utils/login-register/errorValidator";

export type LoginFormValues = {
  email: string | null;
  password: string | null;
};

type ComponentProps = {
  changeSelection: (val: "login" | "register") => void;
};

export default function LoginForm({ changeSelection }: ComponentProps) {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormValues>({
    email: null,
    password: null,
  });

  const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...validateLoginErrors({
        ...errors,
        [e.target.id]: e.target.value,
      }),
    });
  };
  return (
    <div className="flex flex-col h-full justify-between">
      <form className="text-white flex flex-col gap-3 h-[80%] justify-evenly">
        <div className="pb-5">
          <h2 className="text-2xl text-center font-black">Inicia Sesión</h2>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            id="email"
            errorMessage={errors.email}
            label="Correo Electronico"
            labelPlacement="outside"
            value={formValues.email as string}
            isInvalid={!!errors.email}
            onChange={handleFormChanges}
            placeholder="correo@email.com"
            variant="underlined"
            startContent={
              <img src="/icons/email.svg" alt="email_logo" className="w-5" />
            }
          />
          <div className="flex flex-col">
            <Input
              id="password"
              label="Contraseña"
              type="password"
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              value={formValues.password as string}
              onChange={handleFormChanges}
              labelPlacement="outside"
              variant="underlined"
              placeholder="Escribe tu contraseña"
              startContent={
                <img src="/icons/lock.svg" alt="lock_logo" className="w-5" />
              }
            />
            <p className="text-[12px] self-end text-black/60 hover:text-black/100 hover:cursor-pointer">
              Olvidé la contraseña
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button fullWidth radius="full">
            Iniciar sesión
          </Button>
        </div>
      </form>
      <div className="text-white text-center">
        <p className="text-sm">¿No tienes cuenta?</p>
        <p
          className="text-white/60 text-sm hover:text-white/100 hover:cursor-pointer"
          onClick={() => changeSelection("register")}
        >
          Registrate
        </p>
      </div>
    </div>
  );
}
