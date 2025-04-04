"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "@/app/store/zustand";
import Image from "next/image";

type ComponentProps = {
  type: "login" | "register";
};

export default function AuthComponent({ type }: ComponentProps) {
  const [selected, setSelected] = useState<"login" | "register">(type);
  const { setAuthOptions } = useStore();
  const changeForm = (selection: "login" | "register") => {
    setSelected(selection);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm p-10 absolute top-0 left-0 z-50">
      <Card
        radius="sm"
        className="w-full max-w-[450px] h-full max-h-[600px] text-white dark"
      >
        <CardBody className="p-6 xs:p-10 flex relative">
          <Image
            src="/icons/close.svg"
            alt="close"
            width={50}
            height={50}
            className="w-7 absolute right-3 top-3 hover:cursor-pointer"
            onClick={() => setAuthOptions({ isVisible: false })}
          />
          {selected === "login" ? (
            <LoginForm changeSelection={changeForm} />
          ) : (
            <RegisterForm changeSelection={changeForm} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
