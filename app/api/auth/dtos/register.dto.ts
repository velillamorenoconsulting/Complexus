import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { User } from "../../entities/user.entity";
import { Member } from "../../entities/member.entity";

export class UserRegisterBody extends User {
  @IsStrongPassword({
    minLength: 7,
  })
  password!: string;
}

export class MemberRegisterBody extends Member {
  @IsStrongPassword({
    minLength: 7,
  })
  password!: string;
}
