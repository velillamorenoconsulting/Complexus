import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserService } from "../../services/user.service";
import { auth } from "../firebase";
import { validateRegister } from "../utils/validateUserInfo";
import { ApplicationError, ValidateError } from "../../utils/errors";
import { User } from "../../entities/user.entity";
import { Member } from "../../entities/member.entity";
import { LoginType } from "../../types/auth.types";
import { MemberService } from "../../services/member.service";

export class RegisterService {
  private readonly userService: UserService;
  private readonly memberService: MemberService;
  constructor() {
    this.userService = new UserService();
    this.memberService = new MemberService();
  }

  async registerUser(userInfo: any): Promise<User> {
    validateRegister(userInfo, LoginType.USER);
    const existentUser = await this.userService.getUserByEmail(
      userInfo.email,
      false
    );
    if (existentUser) {
      throw new ApplicationError("Email already registered");
    }
    const userCreated = await this.userService.createUser(userInfo);
    let fireBaseId: string = "";
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        userCreated.email,
        userInfo.password
      );
      fireBaseId = userAuth.user.uid;
    } catch (error: any) {
      await this.userService.deleteUser(userCreated.userId, false);
      throw new ValidateError([...error.message]);
    }
    const result = await this.userService.updateUser(userCreated.userId, {
      fireBaseId,
    });
    return result;
  }

  async registerMember(memberInfo: any): Promise<Member> {
    validateRegister(memberInfo, LoginType.MEMBER);
    const memberCreated = await this.memberService.createMember(memberInfo);
    let fireBaseId: string = "";
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        memberCreated.email,
        memberInfo.password
      );
      fireBaseId = userAuth.user.uid;
    } catch (error: any) {
      await this.memberService.deleteMember(memberCreated.memberId, false);
      throw new ValidateError([...error.message]);
    }
    const result = await this.memberService.updateMember(
      memberCreated.memberId,
      {
        fireBaseId,
      }
    );
    return result;
  }
}
