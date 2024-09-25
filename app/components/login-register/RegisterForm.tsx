"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { validateRegisterErrors } from "@/app/utils/login-register/errorValidator";
import axios from "axios";

export type RegisterFormValues = {
  email: string | null;
  password: string | null;
  name: string | null;
};

type ComponentProps = {
  changeSelection: (val: "login" | "register") => void;
};

export default function RegisterForm({ changeSelection }: ComponentProps) {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<RegisterFormValues>({
    email: null,
    password: null,
    name: null,
  });
  const [generalError, setError] = useState<string | null>(null);

  const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...validateRegisterErrors({
        ...errors,
        [e.target.id]: e.target.value,
      }),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValues.name) {
      alert("Wrong input");
      return;
    }
    const splittedName = formValues.name.split(" ");
    const firstName = splittedName[0];
    const lastName = splittedName.length > 1 ? splittedName[1] : "";
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/register`,
        {
          firstName,
          lastName,
          email: formValues.email,
          password: formValues.password,
        }
      );
    } catch (error: any) {
      const message =
        error.response.data?.error === "Email already registered"
          ? "Este correo ya existe"
          : "Error. Intenta nuevamente más tarde";
      setError(message);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <form
        className="text-white flex flex-col gap-3 h-[80%] justify-evenly"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl text-center font-black">Registro</h2>
        </div>
        {generalError && (
          <p className="text-red-600 text-center">{generalError}</p>
        )}
        <div className="flex flex-col gap-5">
          <Input
            id="name"
            errorMessage={errors.name}
            label="Nombre"
            labelPlacement="outside"
            value={formValues.name as string}
            isInvalid={!!errors.name}
            onChange={handleFormChanges}
            placeholder="John Doe"
            variant="underlined"
            className="dark"
            startContent={
              <img src="/icons/user.svg" alt="user_icon" className="w-5" />
            }
          />
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
            className="dark"
            startContent={
              <img src="/icons/email.svg" alt="email_logo" className="w-5" />
            }
          />
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
            className="dark"
            placeholder="Escribe tu contraseña"
            startContent={
              <img src="/icons/lock.svg" alt="lock_logo" className="w-5" />
            }
          />
        </div>
        <div className="flex justify-center">
          <Button
            fullWidth
            radius="full"
            className="dark"
            type="submit"
            isDisabled={
              !formValues.email ||
              !!errors.email ||
              !formValues.password ||
              !!errors.password ||
              !formValues.name ||
              !!errors.name
            }
          >
            Registrarse
          </Button>
        </div>
      </form>
      <div className="text-white text-center">
        <p className="text-sm">¿Ya tienes cuenta?</p>
        <p
          className="text-white/60 text-sm hover:text-white/100 hover:cursor-pointer"
          onClick={() => changeSelection("login")}
        >
          Inicia sesión
        </p>
      </div>
    </div>
  );
}
