"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

type Props = {
  isOpen: boolean;
  closingFunction: (disp: boolean) => void;
  action: (...params: any[]) => Promise<void>;
  closeAction?: (...params: any[]) => void;
  title: string;
  text: string;
};

export default function Confirmation({
  closingFunction,
  isOpen,
  action,
  title,
  text,
  closeAction,
}: Props) {
  const { onOpenChange } = useDisclosure();
  if (!isOpen) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-center"
        closeButton={<></>}
      >
        <ModalContent className="text-white">
          {(onClose) => (
            <>
              <ModalHeader>
                <h4 className="text-xl font-raleway font-bold">{title}</h4>
              </ModalHeader>
              <ModalBody>
                <p className="font-raleway">{text}</p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                <Button
                  onClick={() => {
                    action();
                    closingFunction(false);
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    closingFunction(false);
                    if (closeAction) {
                      closeAction();
                    }
                  }}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
