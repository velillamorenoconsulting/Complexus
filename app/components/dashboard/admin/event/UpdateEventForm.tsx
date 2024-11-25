"use client";
import { Event, Segment } from "@/app/api/entities/event.entity";
import { SignedAuth } from "@/app/api/types/auth.types";
import CompLoading from "@/app/components/CompLoading";
import UploadWidget from "@/app/components/UploadWidget";
import { ServerResponse } from "@/app/types/responses";
import { FetchState } from "@/app/types/types";
import { convertDate, formatPrice, sendAlert } from "@/app/utils";
import {
  Button,
  DateInput,
  DateValue,
  Divider,
  Input,
  ModalBody,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import ImageList from "../common/ImageList";
import { handleRemovingImages } from "@/app/utils/handleRemovingImages";
import { CreateEventForm } from "../CreateEvent";
import useFormBase from "@/app/components/hooks/useFormBase";
import { updateEventValidations } from "@/app/utils/admValidations";

type Props = {
  eventId: string;
  onClose: () => void;
  state: FetchState<Event[]>;
  forceRefetch: (disp: FetchState<Event[]>) => void;
};

export type UpdateEventForm = {
  title: string;
  description: string;
  details: string;
  price: string;
  transmissionUrl: string;
  endAt: string;
};

const initializer: UpdateEventForm = {
  title: "",
  description: "",
  details: "",
  price: "",
  transmissionUrl: "",
  endAt: "",
};

export default function UpdateEventForm({
  eventId,
  onClose,
  state,
  forceRefetch,
}: Props) {
  const [loading, isLoading] = useState<boolean>(false);
  const { status, data } = useSession();
  const [endDate, setEndDate] = useState<DateValue>();
  const [images, setImages] = useState<string[]>([]);
  const originalImageList = useRef<string[] | null>(null);
  const { formValues, handleChange, clearForm, changeInitializer } =
    useFormBase(initializer, updateEventValidations);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "authenticated") return;
    isLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/event/${eventId}`, {
        ...formValues,
        endAt: endDate
          ? `${endDate.year}-${endDate?.month.toString().padStart(2, "0")}-${endDate.day.toString().padStart(2, "0")}`
          : undefined,
        price: parseInt(formValues.price),
        updatedBy: (data?.user as SignedAuth).id,
        segments: convertSegments(formValues.details),
        images,
        details: undefined,
      });
      sendAlert({
        title: "Publicacion creada",
        text: "Ve al panel de edicion para agregar mayor informacion e imagenes.",
        type: "success",
        timing: 2000,
      });
      onClose();
      forceRefetch({ ...state, refetch: true });
      handleRemovingImages(originalImageList.current as string[], eventId);
    } catch (e) {
      console.log(e);
    } finally {
      isLoading(false);
    }
  };

  const convertSegments = (raw: string): Segment[] => {
    const segmentTexts: string[] = raw.split("\n\n");
    const segments: Segment[] = [];
    for (const segmentText of segmentTexts) {
      segments.push({ text: segmentText });
    }
    return segments;
  };

  const joinSegments = (segments: Segment[]): string => {
    let full: string[] = [];
    for (const segment of segments) {
      if (segment.text) {
        full.push(segment.text);
      }
    }
    return full.join("\n\n");
  };

  useEffect(() => {
    const fetchEvent = async () => {
      isLoading(true);
      try {
        const { data } = await axios.get<ServerResponse<Event>>(
          `${process.env.NEXT_PUBLIC_BE_URL}/event/${eventId}`,
        );
        changeInitializer({
          title: data.message.title,
          description: data.message.description,
          endAt: data.message.endAt ? convertDate(data.message.endAt) : "",
          transmissionUrl: data.message.transmissionUrl ?? "",
          details: data.message.segments.length
            ? joinSegments(data.message.segments)
            : "",
          price: data.message.price.toString(),
        });
        setImages(data.message.images ?? []);
        originalImageList.current = data.message.images;
      } catch (e) {
      } finally {
        isLoading(false);
      }
    };
    fetchEvent();
    return () => {
      clearForm();
      originalImageList.current = null;
    };
  }, []);

  return (
    <>
      <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
        Editar Evento
      </ModalHeader>
      <Divider className="my-3 dark" />
      <ModalBody className="py-5 px-8 font-raleway">
        <form className="flex flex-col gap-2 relative" onSubmit={handleUpdate}>
          {loading && <CompLoading />}
          <Input
            label="Titulo"
            value={formValues.title}
            id="title"
            onChange={handleChange}
          />
          <Textarea
            label="Descripcion"
            value={formValues.description}
            maxRows={3}
            id="description"
            onChange={handleChange}
          />
          <Divider className="my-2" />
          <UploadWidget
            uploadPreset="Events"
            currentImages={images}
            imageSetter={setImages}
          />
          <ImageList imageList={images ?? []} setImageFunction={setImages} />
          <Divider className="my-2" />
          <DateInput
            label="Finaliza"
            value={endDate}
            onChange={setEndDate}
            description={`Actual: ${formValues.endAt ?? "Ninguna"}`}
          />
          <Input
            label="Precio"
            value={formValues.price}
            onChange={handleChange}
            id="price"
          />
          <Input label="Apoya" description="Agregar separado con comas" />
          <Input
            label="Patrocinadores"
            description="Agregar separado con comas"
          />
          <Input label="Invitan" description="Agregar separado con comas" />
          <Input
            id="transmissionUrl"
            onChange={handleChange}
            label="Link de transmision"
            description="Enlace de youtube donde fue o sera transmitido el evento"
          />
          <Textarea
            value={formValues.details}
            maxRows={8}
            label="Detalles completos"
            id="details"
            onChange={handleChange}
          />
          <Button className="my-3" type="submit">
            Actualizar
          </Button>
        </form>
      </ModalBody>
    </>
  );
}
