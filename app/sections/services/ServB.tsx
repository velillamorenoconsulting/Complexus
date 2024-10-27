import React from "react";

export default function ServB() {
  return (
    <div className="bg-[#eeefe8] text-black p-16 md:p-28 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-8">
        <h3 className="font-comorant text-5xl text-center">Acciones</h3>
        <div className="w-full grid grid-cols-1 grid-rows-6 font-raleway font-light lg:grid-cols-2 lg:grid-rows-3 text-xl">
          <div className="bg-[#22302f] text-[#e4cab8] p-6 flex flex-row items-center">
            Proyectos de Integración ​Académico-Empresarial.
          </div>
          <div className="bg-[#e4cab8] text-[#22302f] p-6 flex flex-row items-center">
            Creación Administración y Realización de ​Proyectos y Eventos
            culturales.
          </div>
          <div className="bg-[#22302f] text-[#e4cab8] p-6 lg:bg-[#e4cab8] lg:text-[#22302f] flex flex-row items-center text-lg md:text-xl">
            Proyectos interdisciplinarios, utilizando ​principios de pensamiento
            y creando ​puentes entre la academia y las ​personas que pueden
            influir en ​determinados sectores, para hacer ​avanzar en forma real
            las mentalidades ​y transformar el modo de pensar ​individual y
            colectivo.
          </div>
          <div className="bg-[#e4cab8] lg:bg-[#22302f] p-6 text-[#22302f] lg:text-[#e4cab8] flex flex-row items-center">
            Creación Administración y Realización ​de Proyectos y Eventos
            artísticos y editoriales
          </div>
          <div className="bg-[#22302f] text-[#e4cab8] p-6 flex flex-row items-center">
            Creación, Administración y ​Realización de Proyectos y ​Eventos
            académicos.
          </div>
          <div className="bg-[#e4cab8] text-[#22302f] p-6 flex flex-row items-center">
            Consultorías y Asesorías Interdisciplinarias ​a Empresas y
            Organizaciones Públicas y ​Privadas, Nacionales e Internacional.
          </div>
        </div>
      </div>
    </div>
  );
}
