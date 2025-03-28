"use client";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import CompLoading from "../CompLoading";
import { useStore } from "@/app/store/zustand";
import Swal from "sweetalert2";
import Image from "next/image";
import useFormBase from "../hooks/useFormBase";
import { loginFormValidations } from "@/app/utils/userValidations";

export type LoginFormValues = {
  email: string | null;
  password: string | null;
};

const initializer: LoginFormValues = {
  email: "",
  password: "",
};

type ComponentProps = {
  changeSelection: (val: "login" | "register") => void;
};

export default function LoginForm({ changeSelection }: ComponentProps) {
  const [generalError, setError] = useState<string | null>(null);
  const [loading, isLoading] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>("user");
  const { switchLogged, setAuthOptions } = useStore();
  const { formValues, formErrors, handleChange, isButtonDisabled } =
    useFormBase(initializer, loginFormValidations);
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      switchLogged(true);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    const result = await signIn(`credentials-${loginType}`, {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });
    isLoading(false);
    setError(handleError(result));
    if (result?.ok) {
      switchLogged(true);
      setAuthOptions({ isVisible: false });
      Swal.fire({
        title: "¡Bienvenido/a!",
        icon: "success",
        timer: 1000,
        color: "#ffffff",
        background: "#1E1E1E",
        showConfirmButton: false,
        customClass: {
          title: "font-raleway",
        },
      });
    }
  };

  const handleError = (error?: SignInResponse): string | null => {
    if (error?.ok) return null;
    else if (error?.status === 401) {
      if (error?.error?.includes("credential")) {
        return "Credenciales Incorrectas";
      } else if (error.error === "Verification missing") {
        return "Aún no has verificado tu correo";
      } else return "Ha ocurrido un error. Intenta nuevamente luego";
    } else return "Ha ocurrido un error. Intenta nuevamente luego";
  };
  return (
    <div className="flex flex-col h-full justify-between relative">
      {loading && <CompLoading />}
      <form
        className="text-white flex flex-col gap-3 h-[80%] justify-evenly"
        onSubmit={handleSubmit}
      >
        <div className="pb-5">
          <h2 className="text-2xl text-center font-black">Inicia Sesión</h2>
        </div>
        {generalError && (
          <p className="text-red-600 text-center">{generalError}</p>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <Tabs
              variant="solid"
              size="sm"
              selectedKey={loginType}
              onSelectionChange={(key) => setLoginType(key as string)}
            >
              <Tab key="user" title="Usuario" />
              <Tab key="member" title="Miembro" />
            </Tabs>
          </div>
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
            startContent={
              <Image
                src="/icons/email.svg"
                alt="email_logo"
                className="w-5"
                width={20}
                height={20}
              />
            }
          />
          <div className="flex flex-col">
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
            <p className="text-[12px] self-end text-white/60 hover:text-white/100 hover:cursor-pointer">
              Olvidé la contraseña
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            fullWidth
            radius="full"
            type="submit"
            isDisabled={isButtonDisabled}
          >
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
