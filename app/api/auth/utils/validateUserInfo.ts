import { instanceToPlain } from "class-transformer";
import { RegisterBody } from "../dtos/register.dto";
import { validateOrReject } from "class-validator";
import { ValidateError } from "../../utils/errors";

export const validateUserRegister = (userInfo: any): void => {
  const body = instanceToPlain(RegisterBody, userInfo);
  validateOrReject(body);
  if (userInfo.password.length < 7) {
    throw new ValidateError(["Password too short. No less than 6 characters"]);
  }
};
