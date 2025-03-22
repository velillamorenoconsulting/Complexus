import { IsEmail, IsEnum, IsStrongPassword } from "class-validator";
import { LoginType } from "../../types/auth.types";

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsStrongPassword({
    minLength: 7,
  })
  password!: string;

  @IsEnum(LoginType)
  type!: LoginType;
}
