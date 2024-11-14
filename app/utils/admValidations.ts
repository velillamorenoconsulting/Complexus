import { FormValidations } from "../types/types";
import {
  countryRegex,
  emailRegex,
  fullNameRegex,
  passwordRegex,
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
