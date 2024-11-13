import { CreateMemberForm } from "@/app/components/dashboard/admin/CreateMember";
// TODO GENERALIZE THIS IMPORTS
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const fullNameRegex = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
const countryRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/;
// TODO Abstract this as Its widely used, with initializer
export function ValidateMemberForm(val: CreateMemberForm): CreateMemberForm {
  const result: CreateMemberForm = {
    fullName: null,
    email: null,
    country: null,
    password: null,
  };

  if (val.email) {
    if (!emailRegex.test(val.email)) result.email = "Correo incorrecto";
  }
  if (val.fullName) {
    if (!fullNameRegex.test(val.fullName))
      result.fullName = "Nombre incorrecto";
  }
  if (val.country) {
    if (!countryRegex.test(val.country)) result.country = "Pais incorrecto";
  }
  if (val.password) {
    if (!passwordRegex.test(val.password))
      result.password = "Contraseña muy débil";
  }

  return result;
}
