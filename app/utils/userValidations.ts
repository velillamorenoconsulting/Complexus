import { FormValidations } from "../types/types";
import { getValidateLengthFunction } from "./functionValidators";
import { emailRegex, fullNameRegex, nameRegex, passwordRegex } from "./regex";
import { ValidationError } from "class-validator";
import { ApplicationError, ValidateError } from "@/app/api/utils/errors";

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

export const handleValidationError = (error: unknown) => {
  if (
    Array.isArray(error) &&
    error.every((e) => e instanceof ValidationError)
  ) {
    const constraints = error.map((error: ValidationError) => {
      const key = Object.keys(error.constraints as object)[0];
      return error.constraints?.[key];
    });
    throw new ValidateError(constraints as string[]);
  } else {
    throw new ApplicationError((error as Error).message);
  }
};
