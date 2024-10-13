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
import { usePathname, useRouter } from "next/navigation";
import { removePathNameSlash } from "@/app/utils/utils";
import Swal from "sweetalert2";

type ComponentProps = {
  style: "dark" | "light";
};

export default function BurgerMenu({ style }: ComponentProps) {
  const session = useSession();
  const pathName = usePathname();
  const redirect = useRouter();
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
                onClick={() => redirect.push("/dashboard")}
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
            <Link href="/events" className="font-raleway text-md">
              <p>Eventos</p>
            </Link>
          </DropdownItem>
          <DropdownItem key={CurrentPage.SERVICES}>
            <Link href="/services" className="font-raleway text-md">
              <p>Servicios</p>
            </Link>
          </DropdownItem>
          <DropdownItem key={CurrentPage.CONTACT}>
            <Link href="/contact" className="font-raleway text-md">
              <p>Contacto</p>
            </Link>
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
                  Swal.fire({
                    title: "Sesión finalizada",
                    icon: "success",
                    timer: 1000,
                    color: "#ffffff",
                    background: "#1E1E1E",
                    showConfirmButton: false,
                    customClass: {
                      title: "font-raleway",
                    },
                  });
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
