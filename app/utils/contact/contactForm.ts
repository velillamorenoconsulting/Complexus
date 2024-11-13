import { ContactFormValues } from "@/app/components/contact/ContactForm";

const regexInputs = {
  name: /^(?!.*\d)([A-Za-z]+|[A-Za-z]+ [A-Za-z]+)$/,
};

export const validateMainFormErrors = (
  values: ContactFormValues,
): ContactFormValues => {
  const result: ContactFormValues = {
    name: null,
    subject: null,
    reason: null,
    message: null,
  };

  if (values.name) {
    if (values.name.length < 3 || !regexInputs.name.test(values.name)) {
      result.name = "Nombre inválido.";
    }
  }
  if (
    values.subject &&
    (values.subject.length < 3 || values.subject.length > 30)
  ) {
    result.subject = "Asunto incorrecto.";
  }
  if (values.reason && values.reason.length < 3) {
    result.reason = "El motivo debe ser más extenso.";
  }
  if (values.message && values.message.length < 30) {
    result.message = "Mensaje muy corto.";
  }

  return result;
};
