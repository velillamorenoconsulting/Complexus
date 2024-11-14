import { FormValidations } from "../types/types";
import { getValidateLengthFunction } from "./functionValidators";
import { emailRegex, fullNameRegex, nameRegex, passwordRegex } from "./regex";

// ContactForm
export const contactFormValidations = {
  name: [
    {
      regex: nameRegex,
      condition: getValidateLengthFunction(3),
      failedMessage: "Nombre inválido.",
    },
  ],
  subject: [
    {
      failedMessage: "Asunto incorrecto.",
      condition: getValidateLengthFunction(3),
    },
  ],
  reason: [
    {
      failedMessage: "El motivo debe ser más extenso.",
      condition: getValidateLengthFunction(3),
    },
  ],
  message: [
    {
      failedMessage: "Mensaje muy corto",
      condition: getValidateLengthFunction(30),
    },
  ],
};

export const footerContactFormValidations: FormValidations = {
  subject: [
    {
      condition: getValidateLengthFunction(3, 30),
      failedMessage: "El asunto debe tener entre 3 a 30 caracteres",
    },
  ],
  message: [
    {
      failedMessage: "Mensaje muy corto",
      condition: getValidateLengthFunction(5, 30),
    },
  ],
};

// Events

export const eventQuestionValidation: FormValidations = {
  questionContent: [
    {
      failedMessage: "Pregunta muy corta o muy extensa.",
      condition: getValidateLengthFunction(5, 100),
    },
  ],
  additionalDescription: [
    {
      failedMessage: "Descripcion muy corta",
      condition: getValidateLengthFunction(10),
    },
  ],
};

// Auth

export const loginFormValidations: FormValidations = {
  email: [
    {
      regex: emailRegex,
      failedMessage: "Correo inválido",
    },
  ],
  password: [
    {
      regex: passwordRegex,
      failedMessage: "Contraseña inválida",
    },
  ],
};

export const registerFormValidations: FormValidations = {
  email: [
    {
      regex: emailRegex,
      failedMessage: "Correo inválido",
    },
  ],
  password: [
    {
      regex: passwordRegex,
      failedMessage: "Contraseña inválida",
    },
  ],
  name: [
    {
      regex: fullNameRegex,
      failedMessage: "Nombre incorrecto",
    },
  ],
};
