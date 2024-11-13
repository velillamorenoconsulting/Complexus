"use client";
import { useStore } from "@/app/store/zustand";
import { ThemeType } from "@/app/types/types";
import { isDarkTheme } from "@/app/utils/utils";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  Divider,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

type ComponentProps = {
  style: ThemeType;
};

export default function DesktopAvatar({ style }: ComponentProps) {
  const session = useSession();
  const redirect = useRouter();
  const { onClose } = useDisclosure();
  const { setAuthOptions } = useStore();
  const [isOpen, setOpen] = useState<boolean>(false);
  console.log(session);
  return (
    <div className="font-raleway">
      {session.status === "authenticated" ? (
        <div className="">
          <Dropdown className="dark text-white">
            <DropdownTrigger>
              <User
                classNames={{
                  name: "text-lg",
                  description: `text-md opacity-80 ${isDarkTheme(style) ? "text-black" : "text-white"}`,
                }}
                name={session.data.user?.name}
                description={session.data.user?.email}
                avatarProps={{
                  src: session.data.user?.image ?? "/icons/user-default.svg",
                }}
                className={`dark hover:cursor-pointer ${
                  isDarkTheme(style) ? "text-black" : "text-white"
                }`}
              />
            </DropdownTrigger>
            <DropdownMenu className="font-raleway">
              <DropdownItem
                textValue="a"
                onClick={() => redirect.push("/dashboard")}
              >
                Panel de control
              </DropdownItem>
              <DropdownItem textValue="b">
                <Divider />
              </DropdownItem>
              <DropdownItem onClick={() => setOpen(true)} textValue="c">
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal
            isOpen={isOpen}
            onOpenChange={(val) => setOpen(val)}
            className="dark"
          >
            <ModalContent content="center" className="p-2">
              <ModalBody>
                <p className="font-raleway text-white">
                  ¿Estás seguro que deseas salir?
                </p>
              </ModalBody>
              <ModalFooter content="center">
                <Button
                  onClick={() => {
                    signOut({ redirect: false });
                    onClose();
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
                >
                  Aceptar
                </Button>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <ButtonGroup>
          <Button
            variant="ghost"
            radius="sm"
            className={`${isDarkTheme(style) ? "" : "dark"}`}
            onClick={() => setAuthOptions({ isVisible: true, type: "login" })}
          >
            Inicia sesión
          </Button>
          <Button
            variant="ghost"
            radius="sm"
            className={`${isDarkTheme(style) ? "" : "dark"}`}
            onClick={() =>
              setAuthOptions({ isVisible: true, type: "register" })
            }
          >
            Registrate
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}
