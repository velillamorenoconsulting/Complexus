import React from "react";

type Props = {};

export default function ErrorComp({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="font-comorant text-3xl">Oops! Parece que hubo un error</h2>
      <p className="font-raleway text-xl">
        Hubo un error en la información de esta pagina. Intenta recargarla o
        déjanos saber si se trata de un error general
      </p>
    </div>
  );
}
