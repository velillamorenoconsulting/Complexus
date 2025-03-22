"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import useFormBase from "../hooks/useFormBase";
import { registerFormValidations } from "@/app/utils/userValidations";
import CompLoading from "../CompLoading";
import Swal from "sweetalert2";
import { useStore } from "@/app/store/zustand";

export type RegisterFormValues = {
  email: string | null;
  password: string | null;
  name: string | null;
};

const initializer: RegisterFormValues = {
  email: null,
  password: null,
  name: null,
};

type ComponentProps = {
  changeSelection: (val: "login" | "register") => void;
};

export default function RegisterForm({ changeSelection }: ComponentProps) {
  const { formValues, formErrors, handleChange, isButtonDisabled } =
    useFormBase(initializer, registerFormValidations);
  const { setAuthOptions } = useStore();
  const [generalError, setError] = useState<string | null>(null);
  const [loading, isLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    const splittedName = formValues.name!.split(" ");
    const firstName = splittedName[0];
    const lastName = splittedName.length > 1 ? splittedName[1] : "";
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/register`, {
        type: "user",
        firstName,
        lastName,
        email: formValues.email,
        password: formValues.password,
      });
      Swal.fire({
        title: "¡Registro exitoso!",
        icon: "success",
        text: "Revisa tu correo para verificar tu cuenta",
        timer: 1000,
        color: "#ffffff",
        background: "#1E1E1E",
        showConfirmButton: false,
        customClass: {
          title: "font-raleway",
        },
      });
      setAuthOptions({ isVisible: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.error === "Email already registered"
            ? "Este correo ya existe"
            : "Error. Intenta nuevamente más tarde";
        setError(message);
      }
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between relative">
      {loading && <CompLoading />}
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
            errorMessage={formErrors.name}
            label="Nombre"
            labelPlacement="outside"
            value={formValues.name as string}
            isInvalid={!!formErrors.name}
            onChange={handleChange}
            placeholder="John Doe"
            variant="underlined"
            className="dark"
            startContent={
              <Image
                width={20}
                height={20}
                src="/icons/user.svg"
                alt="user_icon"
                className="w-5"
              />
            }
          />
          <Input
            id="email"
            errorMessage={formErrors.email}
            label="Correo Electronico"
            labelPlacement="outside"
            value={formValues.email as string}
            isInvalid={!!formErrors.email}
            onChange={handleChange}
            placeholder="correo@email.com"
            variant="underlined"
            className="dark"
            startContent={
              <Image
                width={20}
                height={20}
                src="/icons/email.svg"
                alt="email_logo"
                className="w-5"
              />
            }
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            isInvalid={!!formErrors.password}
            errorMessage={formErrors.password}
            value={formValues.password as string}
            onChange={handleChange}
            labelPlacement="outside"
            variant="underlined"
            className="dark"
            placeholder="Escribe tu contraseña"
            startContent={
              <Image
                width={20}
                height={20}
                src="/icons/lock.svg"
                alt="lock_logo"
                className="w-5"
              />
            }
          />
        </div>
        <div className="flex justify-center">
          <Button
            fullWidth
            radius="full"
            className="dark"
            type="submit"
            isDisabled={isButtonDisabled}
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
