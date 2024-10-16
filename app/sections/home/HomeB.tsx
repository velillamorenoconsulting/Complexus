import React from "react";

export default function HomeB() {
  return (
    <div className="w-full flex justify-center bg-[#ecf4f4]">
      <div className="flex flex-col md:flex-row gap-10 p-16 max-w-[1600px]">
        <h3 className="font-comorant text-5xl font-semibold">Quienes somos</h3>
        <div className="flex flex-col font-raleway text-justify gap-3 text-lg">
          <p>
            Somos{" "}
            <b>
              CORPORACION PARA EL DESARROLLO DEL PENSAMIENTO COMPLEJO-COMPLEXUS.
            </b>{" "}
            Nuestro nombre designa lo que esta tejido en común.
          </p>
          <p>
            Pretendemos materializar, inseminar y diseminar, en proyectos
            económico-sociales y en alianzas estratégicas con instituciones
            educativas y empresas, un modo de pensar que vincule los
            conocimientos más allá de las disciplinas en que se clasifiquen,
            integrándolos y coordinándolos hacia soluciones útiles.
          </p>
          <p>
            Propendemos, en ese sentido, fomentar la creación de herramientas y
            estrategias para llevar a cabo una reforma del pensamiento y de la
            sociedad, así como una reorganización educativa para favorecer la
            contextualización de problemas que necesitan conocimientos diversos
            y muchas veces contradictorios. Todo lo anterior, utilizando
            principios de pensamiento clásico y complejo, creando puentes entre
            la academia y las personas que puedan influir en determinados
            sectores, porque son quienes pueden hacer avanzar en forma real las
            mentalidades y transformar el modo de pensar individual y colectivo.
          </p>
          <p>
            El trabajo de la corporación, trans y metadisciplinario, implica una
            iniciación, una educación mental y una estructura del pensamiento
            que debe reflejarse en toda su labor, para afrontar la complejidad.
          </p>
        </div>
      </div>
    </div>
  );
}
