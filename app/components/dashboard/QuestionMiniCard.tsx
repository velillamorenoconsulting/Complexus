import { Question } from "@/app/api/entities/question.entity";
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type QuestionStatus = "approved" | "waiting" | "rejected";

type Props = { question: Question };

export default function QuestionMiniCard({ question }: Props) {
  const visibilityContent =
    question.visibility === "general"
      ? "¡Tu pregunta ha sido catalogada con mucho valor para la comunidad! Es visible en el resumen del evento"
      : "Tu pregunta es visible solo para ti";
  const questionContent =
    question.questionContent.length > 60
      ? question.questionContent.slice(0, 61) + "..."
      : question.questionContent;
  const questionStatus: QuestionStatus =
    question.isApproved === null
      ? "waiting"
      : question.isApproved
        ? "approved"
        : "rejected";
  return (
    <Card className="hover:cursor-pointer">
      <CardBody>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col w-[70%]">
            <h5 className="font-medium font-raleway text-lg">
              {questionContent}
            </h5>
            <p className="text-sm opacity-55">Evento: {question.event.title}</p>
          </div>
          <div className="flex flex-row gap-5 items-center">
            {question.isAnswered && (
              <Tooltip content="Tu pregunta tiene una respuesta">
                <Image
                  src="/icons/answer.svg"
                  alt="world"
                  width={50}
                  height={50}
                  className="w-5"
                />
              </Tooltip>
            )}
            <div
              className={`w-3 h-3 rounded-full ${
                questionStatus === "approved"
                  ? "bg-green-500"
                  : questionStatus === "waiting"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            ></div>
            <Tooltip
              content={
                <p className="font-raleway max-w-[250px]">
                  {visibilityContent}
                </p>
              }
            >
              <Image
                src="/icons/world.svg"
                alt="world"
                width={100}
                height={100}
                className={`w-5 ${
                  question.isGeneralQuestion ? "opacity-100" : "opacity-30"
                }`}
              />
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
