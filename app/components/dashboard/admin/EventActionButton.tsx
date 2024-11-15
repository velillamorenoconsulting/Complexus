"use client";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UpdateEventForm from "./event/UpdateEventForm";
import { FetchState } from "@/app/types/types";
import { Event } from "@/app/api/entities/event.entity";

type Props = {
  entityId: string;
  isDeleted: boolean;
  path: string;
  state: FetchState<Event[]>;
  forceRefetch: (disp: FetchState<Event[]>) => void;
  showDetails?: boolean;
};

export default function ActionButton({
  entityId,
  isDeleted,
  state,
  forceRefetch,
  path,
  showDetails,
}: Props) {
  const [selection, setSelection] = useState<string>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  console.log(selection);
  return (
    <>
      <Dropdown className="dark">
        <DropdownTrigger>
          <Chip className="hover:cursor-pointer">
            <Image
              src="/icons/action.svg"
              alt=""
              width={20}
              height={20}
              className="w-4 h-4"
            />
          </Chip>
        </DropdownTrigger>
        <DropdownMenu className="dark text-white">
          {/* {showDetails ? (
            <DropdownItem key="review">Ver detalles</DropdownItem>
          ) : (
            <></>
          )} */}
          <DropdownItem
            key="update"
            onClick={(e) => {
              setSelection("update");
              onOpen();
            }}
          >
            Editar
          </DropdownItem>
          {isDeleted ? (
            <DropdownItem key="delete">Eliminar</DropdownItem>
          ) : (
            <DropdownItem key="active">Activar</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top"
        className="dark text-white"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {selection === "update" ? (
                <UpdateEventForm
                  onClose={onClose}
                  eventId={entityId}
                  forceRefetch={forceRefetch}
                  state={state}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
