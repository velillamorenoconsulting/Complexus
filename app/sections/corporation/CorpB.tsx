import { Divider } from "@nextui-org/react";
import React from "react";

export default function CorpB() {
  return (
    <div className="bg-[#22302f] text-white p-16 md:p-28 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-8">
        <h3 className="font-comorant text-5xl text-center">
          ¿Qué es complexus?
        </h3>
        <p className="w-full lg:w-[70%] text-justify font-raleway text-lg">
          La Corporación para el Desarrollo Complexus es una asociación civil de
          carácter privado, sin ánimo de lucro, que fue creada en el año 2001
          por un grupo de intelectuales nacionales e internacionales con el fin
          de promover la integración, el desarrollo y la cooperación
          institucional, así como para materializar, inseminar y diseminar
          proyectos económicos sociales a través de alianzas estratégicas con
          diferentes Instituciones, el paradigma de la complejidad y de la
          visión sistémica, que plantea la necesidad de asociar los diferentes
          campos del conocimiento para lograr una visión integral y más
          humanista de nuestro mundo. Entre sus objetivos temáticos está la
          promoción de los derechos humanos, el estudio de la biodiversidad, el
          avance de la ciencia y la tecnología, la búsqueda del fortalecimiento
          local y regional. Igualmente promueve el desarrollo equitativo y
          sostenible hacia la consolidación de la paz y la democracia. COMPLEXUS
          cuenta con el Alto Patronato de los filósofos Edgar Morin y Fernando
          Savater, y del ex Presidente de la República Belisario Betancur.
          COMPLEXUS está integrado por importantes personalidades nacionales e
          internacionales, como ex ministros de Estado, empresarios, consultores
          privados y destacados intelectuales, entre otros.
        </p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <h3 className="font-comorant text-5xl text-center">Objetivos</h3>
        <div className="w-full 2xl:w-[50%] md:w-[80%] text-center font-raleway text-lg flex flex-col gap-7">
          <p className="w-[80%] self-center">
            Materializar, inseminar y diseminar en proyectos económico-sociales
            y en alianzas estratégicas con instituciones educativas el paradigma
            de la complejidad.
          </p>
          <Divider className="dark" />
          <p className="w-[80%] self-center">
            Fomentar la creación de herramientas y estrategias para llevar a
            cabo una reforma del pensamiento en las organizaciones y de la
            sociedad.
          </p>
          <Divider className="dark" />
          <p className="w-[80%] self-center">
            Fomentar una reorganización educativa para favorecer la
            contextualización de problemas que necesitan conocimientos diversos
            y muchas veces contradictorios.
          </p>
          <Divider className="dark" />
          <p className="w-[80%] self-center">
            Integrar los diversos campos del conocimiento.
          </p>
          <Divider className="dark" />
          <p className="w-[80%] self-center">
            Promover la interdisciplinariedad y la articulación transversal del
            conocimiento, para hacer emerger una ética de cohesión y solidaridad
            en todos los órdenes.
          </p>
        </div>
      </div>
    </div>
  );
}
