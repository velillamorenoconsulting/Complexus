import { LoginFormValues } from "@/app/components/login-register/LoginForm";
import { RegisterFormValues } from "@/app/components/login-register/RegisterForm";

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export function validateLoginErrors(payload: LoginFormValues): LoginFormValues {
  const isEmailValid = payload.email
    ? emailRegex.test(payload.email as string)
    : true;
  const isPasswordValid = payload.password
    ? passwordRegex.test(payload.password as string)
    : true;
  const email = isEmailValid ? null : "Correo inválido";
  const password = isPasswordValid ? null : "Contraseña inválida";
  return {
    email,
    password,
  };
}

export function validateRegisterErrors(
  payload: RegisterFormValues
): RegisterFormValues {
  const isEmailValid = payload.email
    ? emailRegex.test(payload.email as string)
    : true;
  const isPasswordValid = payload.password
    ? passwordRegex.test(payload.password as string)
    : true;
  const isNameValid = payload.name
    ? nameRegex.test(payload.name as string)
    : true;
  const email = isEmailValid ? null : "Correo inválido";
  const password = isPasswordValid ? null : "Contraseña inválida";
  const name = isNameValid ? null : "Nombre incorrecto";

  return {
    email,
    password,
    name,
  };
}
