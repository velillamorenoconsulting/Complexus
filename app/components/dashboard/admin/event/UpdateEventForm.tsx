"use client";
import { Event, Segment } from "@/app/api/entities/event.entity";
import { SignedAuth } from "@/app/api/types/auth.types";
import CompLoading from "@/app/components/CompLoading";
import UploadWidget from "@/app/components/UploadWidget";
import { ServerResponse } from "@/app/types/responses";
import { FetchState } from "@/app/types/types";
import { sendAlert } from "@/app/utils";
import {
  Button,
  DateInput,
  Divider,
  Input,
  ModalBody,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  eventId: string;
  onClose: () => void;
  state: FetchState<Event[]>;
  forceRefetch: (disp: FetchState<Event[]>) => void;
};

export default function UpdateEventForm({
  eventId,
  onClose,
  state,
  forceRefetch,
}: Props) {
  const [loading, isLoading] = useState<boolean>(false);
  const { status, data } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [details, setDetails] = useState<string>();
  const [images, setImages] = useState<string[]>([]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (status !== "authenticated") return;
    isLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/event/${eventId}`, {
        // updatedBy: (data?.user as SignedAuth).id,
        updatedBy: "SYSTEM",
        segments: convertSegments(details as string),
        images,
      });
      sendAlert({
        title: "Publicacion creada",
        text: "Ve al panel de edicion para agregar mayor informacion e imagenes.",
        type: "success",
        timing: 2000,
      });
      onClose();
      forceRefetch({ ...state, refetch: true });
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
        setEvent(data.message);
        setDetails(
          data.message.segments.length
            ? joinSegments(data.message.segments)
            : "",
        );
      } catch (e) {
      } finally {
        isLoading(false);
      }
    };
    fetchEvent();
    return () => setEvent(null);
  }, []);

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(e.target.value);
  };
  return (
    <>
      <ModalHeader className="font-comorant text-3xl font-bold text-center self-center">
        Editar Evento
      </ModalHeader>
      <Divider className="my-3 dark" />
      <ModalBody className="py-5 px-8 font-raleway relative">
        {loading && <CompLoading />}
        <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
          <Input label="Titulo" value={event?.title} />
          <Textarea
            label="Descripcion"
            value={event?.description}
            maxRows={3}
          />
          <Divider className="my-2" />
          <UploadWidget uploadPreset="Events" imageSetter={setImages} />
          <Divider className="my-2" />
          <DateInput label="Finaliza" />
          <Input label="Precio" value={event?.price.toString()} />
          <Input label="Apoya" description="Agregar separado con comas" />
          <Input
            label="Patrocinadores"
            description="Agregar separado con comas"
          />
          <Input label="Invitan" description="Agregar separado con comas" />
          <Input
            label="Link de transmision"
            description="Enlace de youtube donde fue o sera transmitido el evento"
          />
          <Textarea
            onChange={handleDetailsChange}
            value={details}
            maxRows={8}
            label="Detalles completos"
          />
          <Button className="my-3" type="submit">
            Actualizar
          </Button>
        </form>
      </ModalBody>
    </>
  );
}
