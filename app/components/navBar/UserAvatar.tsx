"use client";
import { useStore } from "@/app/store/zustand";
import { ThemeType } from "@/app/types/types";
import { isDarkTheme } from "@/app/utils/utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type ComponentProps = {
  style: ThemeType;
};

export default function UserAvatar({ style }: ComponentProps) {
  const authPaths = ["login", "register"];
  const { setAuthOptions } = useStore();
  const { data, status } = useSession();
  const redirect = useRouter();

  const handleRedirect = () => {
    if ((data?.user as any).type === "user") {
      redirect.push("/dashboard");
    } else {
      redirect.push("/memberDashboard");
    }
  };
  return (
    <div>
      <Dropdown className="dark text-white font-raleway" radius="sm">
        <DropdownTrigger>
          <Image
            src={
              (data?.user?.image ?? isDarkTheme(style))
                ? "/icons/user-defaultb.svg"
                : "/icons/user-default.svg"
            }
            alt="user-menu"
            width={250}
            height={250}
            className="w-10 hover:cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Desktop Auth Context Menu"
          onAction={(key) => {
            if (authPaths.includes(key as string))
              setAuthOptions({ isVisible: true, type: key as any });
          }}
        >
          {status !== "authenticated" ? (
            <DropdownSection>
              <DropdownItem key="login">
                <p>Iniciar sesión</p>
              </DropdownItem>
              <DropdownItem key="register">
                <p>Registro</p>
              </DropdownItem>
            </DropdownSection>
          ) : (
            <DropdownSection>
              <DropdownItem onClick={() => handleRedirect()}>
                <User
                  name={data?.user?.name}
                  description={data?.user?.email}
                  avatarProps={{
                    src: data?.user?.image ?? "/icons/user-default.svg",
                  }}
                />
              </DropdownItem>
              <DropdownItem>Salir</DropdownItem>
            </DropdownSection>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
