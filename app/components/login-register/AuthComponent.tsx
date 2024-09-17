"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type ComponentProps = {
  type: "login" | "register";
};

export default function AuthComponent({ type }: ComponentProps) {
  const [selected, setSelected] = useState<"login" | "register">("login");
  const changeForm = (selection: "login" | "register") => {
    setSelected(selection);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/50 p-10">
      <Card
        radius="sm"
        className="w-full max-w-[450px] h-full max-h-[600px] text-white dark"
      >
        <CardBody className="p-6 xs:p-10 flex">
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
