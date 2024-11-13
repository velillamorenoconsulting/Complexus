import { UserQuestionFormValues } from "@/app/components/events/EventQuestion";

export function validateUserQuestionCreation(
  values: UserQuestionFormValues,
): UserQuestionFormValues {
  const result: UserQuestionFormValues = {
    questionContent: null,
    additionalDescription: null,
    isGeneralQuestion: true,
  };

  if (values.questionContent) {
    if (
      values.questionContent.length < 10 ||
      values.questionContent.length > 100
    ) {
      result.questionContent = "La pregunta tiene un tamaño inválido";
    }
  }
  if (values.additionalDescription) {
    if (values.additionalDescription.length > 200) {
      result.additionalDescription = "El texto es demasiado largo.";
    }
  }

  return result;
}
