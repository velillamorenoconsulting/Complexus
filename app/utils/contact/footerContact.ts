import { FormValues } from "@/app/components/footer/ContactForm";

export const validateErrors = (values: FormValues): FormValues => {
  const response: FormValues = {
    message: null,
    subject: null,
  };
  if (values.subject !== null) {
    if (values.subject.length > 30 || values.subject.length < 3)
      response.subject = "El asunto debe tener entre 3 a 30 caracteres";
  }
  if (values.message !== null) {
    if (values.message.length < 30) response.message = "Mensaje muy corto";
  }
  return response;
};
