import React from "react";

type Props = {
  details?: string;
};

export default function ErrorComp({ details }: Props) {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="font-comorant text-3xl">Oops! Parece que hubo un error</h2>
      <p className="font-raleway text-xl">
        Hubo un error en la información de esta pagina. Intenta recargarla o
        déjanos saber si se trata de un error general {typeof details}
      </p>
      <p className="text-sm font-raleway font-thin">{details}</p>
    </div>
  );
}
