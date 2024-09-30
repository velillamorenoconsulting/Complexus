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
import React from "react";

type ComponentProps = {
  style: ThemeType;
};

export default function UserAvatar({ style }: ComponentProps) {
  const authPaths = ["login", "register"];
  const { setAuthOptions } = useStore();
  const session = useSession();
  return (
    <div>
      <Dropdown className="dark text-white font-raleway" radius="sm">
        <DropdownTrigger>
          <Image
            src={
              session.data?.user?.image ?? isDarkTheme(style)
                ? "/icons/user-defaultb.svg"
                : "/icons/user-default.svg"
            }
            alt="user-menu"
            width={500}
            height={500}
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
          {session.status !== "authenticated" ? (
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
              <DropdownItem>
                <User
                  name={session.data?.user?.name}
                  description={session.data?.user?.email}
                  avatarProps={{
                    src: session.data?.user?.image ?? "/icons/user-default.svg",
                  }}
                />
              </DropdownItem>
            </DropdownSection>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
