import { FormValidations, validEventTypes } from "../types/types";
import { getValidateLengthFunction } from "./functionValidators";
import {
  countryRegex,
  decimalRegex,
  emailRegex,
  fullNameRegex,
  numsOnlyRegex,
  passwordRegex,
  stringOnlyRegex,
} from "./regex";

export const createMemberValidations: FormValidations = {
  fullName: [
    {
      regex: fullNameRegex,
      failedMessage: "Nombre incorrecto",
    },
  ],
  email: [
    {
      regex: emailRegex,
      failedMessage: "Correo incorrecto",
    },
  ],
  country: [
    {
      regex: countryRegex,
      failedMessage: "Pais incorrecto",
    },
  ],
  password: [
    {
      regex: passwordRegex,
      failedMessage: "Contraseña muy débil",
    },
  ],
};

export const eventFormValidations: FormValidations = {
  title: [
    {
      condition: getValidateLengthFunction(5, 60),
      failedMessage: "Campo incorrecto",
    },
  ],
  description: [
    {
      condition: getValidateLengthFunction(20, 200),
      failedMessage: "Extension muy corta/larga",
    },
  ],
  price: [
    {
      regex: numsOnlyRegex,
      failedMessage: "Solo se permiten numeros",
    },
  ],
};

export const createPubValidations: FormValidations = {
  title: [
    {
      condition: getValidateLengthFunction(5, 60),
      failedMessage: "Campo incorrecto",
    },
  ],
  description: [
    {
      condition: getValidateLengthFunction(20, 350),
      failedMessage: "Extension muy corta/larga",
    },
  ],
  price: [
    {
      regex: decimalRegex,
      failedMessage: "Solo se permiten numeros decimales",
    },
  ],
  stock: [
    {
      regex: numsOnlyRegex,
      failedMessage: "Solo se permiten numeros",
    },
  ],
};

export const updateEventValidations: FormValidations = {};
