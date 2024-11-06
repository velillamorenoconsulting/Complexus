import ContactForm from "@/app/components/contact/ContactForm";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export default function ContactA() {
  return (
    <div className="bg-[#22302f] px-10 min-h-screen flex">
      <div className="pt-32 lg:pt-44">
        <div className="flex flex-col lg:flex-row text-white h-full items-center justify-evenly">
          <div className="flex flex-col gap-10 w-[80%] lg:w-1/3">
            <h2 className="font-comorant font-bold text-6xl">
              Contacta con nosotros
            </h2>
            <p className="font-raleway text-xl italic text-justify">
              ¿Estás interesado en nuestros servicios? ¿Deseas participar en
              alguno de nuestros eventos o tienes ideas y sugerencias para
              contribuir a nuestros proyectos? En la Corporación para el
              Desarrollo Complexus, valoramos la colaboración y las alianzas
              estratégicas para generar impacto. Escríbenos y unamos esfuerzos
              para construir un futuro más humanista, sostenible y en paz.
            </p>
            <Divider className="dark my-5" />
            <div className="flex flex-row gap-5 font-raleway text-lg font-light">
              <p>Escribenos a nuestro whatsapp</p>
              <Image
                src="icons/social/whatsapp_dark.svg"
                alt="whatsapp"
                width={50}
                height={50}
                className="w-10 pr-1"
              />
              <p>o llena el formulario para enviarnos un mensaje</p>
            </div>
          </div>
          <div className="w-1/3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
