"use client";
import { Question } from "@/app/api/entities/question.entity";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

type Props = {
  questions: Question[];
};

export default function QuestionAccordion({ questions }: Props) {
  return (
    <Accordion className="dark">
      {questions.map((question) => (
        <AccordionItem
          className="dark font-raleway"
          key={question.questionId}
          title={question.questionContent}
        >
          <p className="p-5 opacity-80">{question.response}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
