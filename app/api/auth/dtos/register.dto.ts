import { IsEmail, IsString } from "class-validator";
import { User } from "../../entities/user.entity";

export class RegisterBody extends User {
  @IsString()
  password!: string;
}
