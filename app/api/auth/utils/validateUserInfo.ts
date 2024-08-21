import { plainToInstance } from "class-transformer";
import { UserRegisterBody, MemberRegisterBody } from "../dtos/register.dto";
import { validateOrReject } from "class-validator";
import { LoginType } from "../../types/auth.types";

export const validateRegister = (userInfo: any, type: LoginType): void => {
  let entity: UserRegisterBody | MemberRegisterBody;
  if (type === "member") {
    entity = plainToInstance(MemberRegisterBody, userInfo);
  } else {
    entity = plainToInstance(UserRegisterBody, userInfo);
  }
  validateOrReject(entity);
};
