"use client";
import { CurrentPage, useStore } from "@/app/store/zustand";
import { pageList, validPages } from "@/app/types/types";
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
import Image from "next/image";

type ComponentProps = {
  style: "dark" | "light";
};

export default function BurgerMenu({ style }: ComponentProps) {
  const session = useSession();
  const pathName = usePathname();
  const redirect = useRouter();
  const { setAuthOptions } = useStore();
  const [localPage, setLocalPage] = useState<CurrentPage>(
    removePathNameSlash(pathName) as CurrentPage,
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
          <Image
            width={50}
            height={50}
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
            <DropdownItem textValue="user">
              <User
                onClick={() =>
                  (session.data.user as Record<string, string>).type === "user"
                    ? redirect.push("/dashboard")
                    : redirect.push("/memberDashboard")
                }
                name={session.data.user?.name}
                description={session.data.user?.email}
                avatarProps={{
                  src: session.data.user?.image ?? "/icons/user-default.svg",
                }}
              />
            </DropdownItem>
          ) : (
            <DropdownItem className="hidden" textValue="hidden"></DropdownItem>
          )}
          <DropdownSection>
            {pageList.map((pageItem) => (
              <DropdownItem key={pageItem.key} textValue={pageItem.name}>
                <Link href={pageItem.redirect} className="font-raleway text-md">
                  <p>{pageItem.name}</p>
                </Link>
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownItem disableAnimation textValue="divider1">
            <Divider />
          </DropdownItem>
          {session.status !== "authenticated" ? (
            <DropdownSection>
              <DropdownItem
                onClick={() => {
                  setAuthOptions({ isVisible: true, type: "login" });
                }}
                textValue="login"
              >
                <p className="font-raleway text-md">Iniciar sesión</p>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setAuthOptions({ isVisible: true, type: "register" });
                }}
                textValue="register"
              >
                <p className="font-raleway text-md">Registrarse</p>
              </DropdownItem>
            </DropdownSection>
          ) : (
            <DropdownItem textValue="signout">
              <p
                onClick={() => {
                  signOut({ redirect: false });
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
