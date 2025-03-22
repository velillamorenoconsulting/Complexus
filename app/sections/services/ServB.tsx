import Image from "next/image";
import React from "react";

export default function ServB() {
  return (
    <div className="bg-[#eeefe8] text-black p-16 md:p-28 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-8">
        <h3 className="font-comorant text-5xl text-center pb-7">Acciones</h3>
        <div className="w-full grid grid-cols-1 grid-rows-6 font-raleway font-light lg:grid-cols-2 lg:grid-rows-3 text-xl">
          <div className="bg-[#22302f] text-[#e4cab8] p-6 flex flex-row items-center">
            <Image
              src="/icons/actions/1.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>Proyectos de Integración ​Académico-Empresarial.</p>
          </div>
          <div className="bg-[#e4cab8] text-[#22302f] p-6 flex flex-row items-center">
            <Image
              src="/icons/actions/2.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>
              Creación Administración y Realización de ​Proyectos y Eventos
              culturales.
            </p>
          </div>
          <div className="bg-[#22302f] text-[#e4cab8] p-6 lg:bg-[#e4cab8] lg:text-[#22302f] flex flex-row items-center text-lg md:text-xl">
            <Image
              src="/icons/actions/4.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>
              Proyectos interdisciplinarios, utilizando ​principios de
              pensamiento y creando ​puentes entre la academia y las ​personas
              que pueden influir en ​determinados sectores, para hacer ​avanzar
              en forma real las mentalidades ​y transformar el modo de pensar
              ​individual y colectivo.
            </p>
          </div>
          <div className="bg-[#e4cab8] lg:bg-[#22302f] p-6 text-[#22302f] lg:text-[#e4cab8] flex flex-row items-center">
            <Image
              src="/icons/actions/7.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>
              Creación Administración y Realización ​de Proyectos y Eventos
              artísticos y editoriales
            </p>
          </div>
          <div className="bg-[#22302f] text-[#e4cab8] p-6 flex flex-row items-center">
            <Image
              src="/icons/actions/5.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>
              Creación, Administración y Realización de Proyectos y Eventos
              académicos.
            </p>
          </div>
          <div className="bg-[#e4cab8] text-[#22302f] p-6 flex flex-row items-center">
            <Image
              src="/icons/actions/6.svg"
              alt=""
              width={100}
              height={100}
              className="w-40 hidden lg:block"
            />
            <p>
              Consultorías y Asesorías Interdisciplinarias a Empresas y
              Organizaciones Públicas y Privadas, Nacionales e Internacional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
