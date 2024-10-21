import { Question } from "@/app/api/entities/question.entity";
import { Divider, Skeleton, Tooltip } from "@nextui-org/react";
import React from "react";
import QuestionMiniCard from "./QuestionMiniCard";
import Image from "next/image";

type ComponentProps = { isLoading: boolean; questions: Question[] };

export default function QuestionsPreview({
  isLoading,
  questions,
}: ComponentProps) {
  return (
    <div>
      <div className="flex flex-row gap-3 items-center">
        <h4 className="text-2xl font-semibold">Preguntas realizadas</h4>
        <Tooltip
          placement="right"
          content={
            <div className="flex flex-col font-raleway max-w-[400px]">
              <p className="font-bold">Información</p>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p>La pregunta se ha aceptado</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <p>La pregunta está en espera de aprobación</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p>La pregunta ha sido rechazada</p>
              </div>
              <p className="opacity-70 italic text-sm pt-2">
                Una vez tu pregunta ha sido aceptada, será visible para los
                participantes del evento, pero no significa que ya fue
                contestada{" "}
              </p>
            </div>
          }
        >
          <Image
            src="/icons/info.svg"
            alt="info"
            width={50}
            height={50}
            className="w-5 h-5 opacity-30"
          />
        </Tooltip>
      </div>
      <Divider className="my-3" />
      {isLoading ? (
        <div className="flex flex-col gap-3 my-5">
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
        </div>
      ) : questions.length ? (
        <div className="flex flex-col gap-3">
          {questions.map((question) => (
            <QuestionMiniCard question={question} />
          ))}
        </div>
      ) : (
        <p className="font-raleway text-md opacity-70">
          No has hecho preguntas.
        </p>
      )}
    </div>
  );
}
