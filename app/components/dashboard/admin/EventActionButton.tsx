"use client";
import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  TableSlots,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UpdateEventForm from "./event/UpdateEventForm";
import { FetchState, TableState } from "@/app/types/types";
import { Event } from "@/app/api/entities/event.entity";
import useEntityDeletion from "../../hooks/useEntityDeletion";
import Confirmation from "../../Confirmation";
import CompLoading from "../../CompLoading";

type Props = {
  entityId: string;
  isDeleted: boolean;
  path: string;
  state: FetchState<Event[]>;
  forceRefetch: TableState<Event[]>;
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
  const {
    handleDeletion,
    isLoading: deletionLoading,
    entityId: aimedId,
  } = useEntityDeletion("event", "SYSTEM", forceRefetch);
  const [isDeletionOpen, setDeletionOpen] = useState<boolean>(false);

  return (
    <>
      <Dropdown className="dark" isDisabled={isDeleted}>
        <DropdownTrigger>
          {deletionLoading ? (
            <CompLoading hasText={false} loaderSize="sm" />
          ) : (
            <Chip
              className="hover:cursor-pointer"
              variant={isDeleted ? "bordered" : "solid"}
            >
              <Image
                src="/icons/action.svg"
                alt=""
                width={20}
                height={20}
                className="w-4 h-4"
              />
            </Chip>
          )}
        </DropdownTrigger>
        <DropdownMenu className="dark text-white">
          <DropdownItem
            key="update"
            onClick={(e) => {
              setSelection("update");
              onOpen();
            }}
          >
            Editar
          </DropdownItem>
          <DropdownItem
            key="delete"
            onClick={() => {
              setDeletionOpen(true);
            }}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Confirmation
        title="¿Está seguro de eliminar este evento?"
        text="Aun podrá ver el evento en la lista, pero no podrá
                  reestablecerlo. Deberá crearlo nuevamente."
        isOpen={isDeletionOpen}
        action={() => handleDeletion(entityId)}
        closingFunction={setDeletionOpen}
      />
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
