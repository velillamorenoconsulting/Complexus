"use client";
import { CurrentPage, useStore } from "@/app/store/zustand";
import { validPages } from "@/app/types/types";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { removePathNameSlash } from "@/app/utils/utils";

type ComponentProps = {
  style: "dark" | "light";
};

export default function BurgerMenu({ style }: ComponentProps) {
  const session = useSession();
  const pathName = usePathname();
  const { setAuthOptions } = useStore();
  const [isLogged, setLogged] = useState<boolean>(
    session.status === "authenticated"
  );
  const [localPage, setLocalPage] = useState<CurrentPage>(
    removePathNameSlash(pathName) as CurrentPage
  );
  return (
    <div>
      <Dropdown
        classNames={{
          base: "w-64",
        }}
        radius="sm"
        aria-label="BurgerMenu_Dropdown"
        id="dropdown"
        className="dark"
      >
        <DropdownTrigger>
          <img
            src={`/icons/burger-menu-${style}.svg`}
            alt="menu_icon"
            className="w-10"
          />
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={[localPage]}
          className="text-white"
          onAction={(key) =>
            validPages.includes(key as string) &&
            setLocalPage(key as CurrentPage)
          }
        >
          {session.status === "authenticated" ? (
            <DropdownItem>
              <User
                name={session.data.user?.name}
                description={session.data.user?.email}
                avatarProps={{
                  src: session.data.user?.image ?? "/icons/user-default.svg",
                }}
              />
            </DropdownItem>
          ) : (
            <DropdownItem className="hidden"></DropdownItem>
          )}
          <DropdownItem key={CurrentPage.HOME}>
            <Link href="/" className="font-raleway text-md">
              <p>Inicio</p>
            </Link>
          </DropdownItem>
          <DropdownItem key={CurrentPage.CORP}>
            <Link href="/corporation" className="font-raleway text-md">
              <p>Corporacion</p>
            </Link>
          </DropdownItem>
          <DropdownItem key={CurrentPage.EVENTS}>
            <p className="font-raleway text-md">Eventos</p>
          </DropdownItem>
          <DropdownItem key={CurrentPage.SERVICES}>
            <p className="font-raleway text-md">Servicios</p>
          </DropdownItem>
          <DropdownItem key={CurrentPage.CONTACT}>
            <p className="font-raleway text-md">Contáctanos</p>
          </DropdownItem>
          <DropdownItem disableAnimation>
            <Divider />
          </DropdownItem>
          {session.status !== "authenticated" ? (
            <DropdownSection>
              <DropdownItem
                onClick={() => {
                  setAuthOptions({ isVisible: true, type: "login" });
                }}
              >
                <p className="font-raleway text-md">Iniciar sesión</p>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setAuthOptions({ isVisible: true, type: "register" });
                }}
              >
                <p className="font-raleway text-md">Registrarse</p>
              </DropdownItem>
            </DropdownSection>
          ) : (
            <DropdownItem>
              <p
                onClick={() => {
                  signOut({ redirect: false });
                  setLogged(false);
                }}
                className="font-raleway text-md"
              >
                Cerrar sesión
              </p>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
