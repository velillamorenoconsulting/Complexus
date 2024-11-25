import { ServerResponse } from "@/app/types/responses";
import { FetchState } from "@/app/types/types";
import { sendAlert } from "@/app/utils";
import {
  Button,
  DateInput,
  DateValue,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useFormBase from "../../hooks/useFormBase";
import { eventFormValidations } from "@/app/utils/admValidations";
import CompLoading from "../../CompLoading";
import { Event } from "@/app/api/entities/event.entity";

type Props = {
  state: FetchState<Event[]>;
  forceRefetch: (disp: FetchState<Event[]>) => void;
};

export type CreateEventForm = {
  title: string;
  startAt: string; // TODO Type this with date picker result
  ubication: string;
  address: string;
  description: string;
  price: string;
  eventType: "virtual" | "onsite" | "both" | null;
};

const initializer: CreateEventForm = {
  title: "",
  startAt: "",
  ubication: "",
  address: "",
  description: "",
  price: "",
  eventType: null,
};

export default function CreateEvent({ state, forceRefetch }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [startDate, setStartDate] = useState<DateValue>();
  const [eventType, setEventType] = useState<string>("");
  const { formValues, formErrors, handleChange, clearForm } = useFormBase(
    initializer,
    eventFormValidations,
  );
  const [loading, isLoading] = useState<boolean>();
  const { data, status } = useSession();

  const isButtonDisabled: boolean =
    !formValues.title ||
    !!formErrors.title ||
    !!formErrors.description ||
    !!formErrors.price ||
    !formValues.ubication ||
    !formValues.address ||
    !startDate ||
    !eventType;

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "authenticated") return;
    try {
      isLoading(true);
      await axios.post<ServerResponse<string>>(
        `${process.env.NEXT_PUBLIC_BE_URL}/event`,
        {
          title: formValues.title,
          startAt: `${startDate?.year}-${startDate?.month.toString().padStart(2, "0")}-${startDate?.day.toString().padStart(2, "0")}`,
          location: {
            ubication: formValues.ubication,
            address: formValues.address,
          },
          description: formValues.description,
          price: parseInt(formValues.price),
          eventType,
          segments: [],
          images: [],
        },
      );
      sendAlert({
        title: "Evento creado",
        text: "Ve al panel de edicion para agregar mayor informacion e imagenes.",
        type: "success",
        timing: 2000,
      });
      onClose();
      clearForm();
      forceRefetch({ ...state, refetch: true });
    } catch (e) {
      sendAlert({
        title: "Ha ocurrido un error",
        text: "Intenta nuevamente luego. Si el error persiste, contactanos.",
        type: "error",
        timing: 2500,
      });
    } finally {
      isLoading(false);
    }
  };
  return (
    <div className="w-full items-center justify-center">
      <Button className="w-[200px] mt-5" onPress={() => onOpen()}>
        Crear Evento
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="dark text-white"
        placement="center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
                Crear Evento
              </ModalHeader>
              <Divider className="my-3 dark" />
              {loading && <CompLoading />}
              <ModalBody className="py-5 px-8 font-raleway">
                <form className="flex flex-col gap-2" onSubmit={handleCreation}>
                  <Input
                    label="Titulo"
                    isRequired
                    onChange={handleChange}
                    id="title"
                    value={formValues.title as string}
                    errorMessage={formErrors.title}
                    isInvalid={!!formErrors.title}
                  />
                  <DateInput
                    isRequired
                    value={startDate}
                    onChange={setStartDate}
                    label="Fecha de Inicio"
                    description="Podras establecer fecha final despues de creado el evento"
                  />
                  <Input
                    label="Ubicacion"
                    isRequired
                    onChange={handleChange}
                    description="Ciudad y pais"
                    id="ubication"
                    value={formValues.ubication as string}
                    errorMessage={formErrors.ubication}
                    isInvalid={!!formErrors.ubication}
                  />
                  <Input
                    label="Direccion"
                    isRequired
                    onChange={handleChange}
                    id="address"
                    value={formValues.address as string}
                    errorMessage={formErrors.address}
                    isInvalid={!!formErrors.address}
                    description="Se puede usar el nombre del lugar en vez de la direccion"
                  />
                  <Textarea
                    label="Detalles"
                    isRequired
                    onChange={handleChange}
                    id="description"
                    value={formValues.description as string}
                    errorMessage={formErrors.description}
                    isInvalid={!!formErrors.description}
                    description="Detalles cortos, breve description. Podras agregar mas detalles despues"
                  />
                  <Input
                    label="Precio"
                    isRequired
                    onChange={handleChange}
                    id="price"
                    value={formValues.price as string}
                    errorMessage={formErrors.price}
                    isInvalid={!!formErrors.price}
                    description="Sin puntos ni comas. En caso de ser gratuito, escribir 0"
                  />
                  <div className="w-full flex items-center justify-between">
                    <label className="opacity-70">Tipo de evento</label>

                    <Select
                      className="w-2/3 dark"
                      selectedKeys={[eventType]}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <SelectItem key="virtual">Virtual</SelectItem>
                      <SelectItem key="onsite">Presencial</SelectItem>
                      <SelectItem key="both">Hibrido</SelectItem>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="mt-5"
                    color="primary"
                    isDisabled={isButtonDisabled}
                  >
                    Enviar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
