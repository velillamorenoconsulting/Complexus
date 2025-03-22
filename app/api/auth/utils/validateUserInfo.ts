import { plainToInstance } from "class-transformer";
import { UserRegisterBody, MemberRegisterBody } from "../dtos/register.dto";
import { validateOrReject, ValidationError } from "class-validator";
import { LoginType } from "../../types/auth.types";
import { Member } from "@/app/api/entities/member.entity";
import { User } from "@/app/api/entities/user.entity";

export const validateRegister = async (
  userInfo: Partial<Member> | Partial<User>,
  type: LoginType,
): Promise<void | ValidationError[]> => {
  let entity: UserRegisterBody | MemberRegisterBody;
  if (type === "member") {
    entity = plainToInstance(MemberRegisterBody, userInfo);
  } else {
    entity = plainToInstance(UserRegisterBody, userInfo);
  }
  await validateOrReject(entity);
};
