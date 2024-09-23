"use client";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import React, { Key, useEffect, useState } from "react";
import { validateLoginErrors } from "@/app/utils/login-register/errorValidator";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import CompLoading from "../CompLoading";
import { useStore } from "@/app/store/zustand";

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
  const [generalError, setError] = useState<string | null>(null);
  const [loading, isLoading] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>("user");
  const { isLogged, switchLogged } = useStore();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      switchLogged(true);
    }
  }, [data]);

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
      alert("Logged!");
    }
  };

  const handleError = (error?: SignInResponse): string | null => {
    if (error?.ok) return null;
    else if (error?.status === 401) {
      return "Credenciales Incorrectas";
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
            isDisabled={
              !formValues.email ||
              !!errors.email ||
              !formValues.password ||
              !!errors.password
            }
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
