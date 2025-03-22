import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { UserService } from "../../services/user.service";
import { auth } from "../firebase";
import { validateRegister } from "../utils/validateUserInfo";
import { ApplicationError } from "../../utils/errors";
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

  async registerUser(userInfo: Record<string, string>): Promise<User> {
    await validateRegister(userInfo, LoginType.USER);
    const existentUser = await this.userService.getUserByEmail(
      userInfo.email,
      false,
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
        userInfo.password,
      );
      await sendEmailVerification(userAuth.user);
      fireBaseId = userAuth.user.uid;
    } catch (error) {
      await this.userService.deleteUser(userCreated.userId, false, "");
      throw new ApplicationError((error as Error).message);
    }
    return await this.userService.updateUser(userCreated.userId, {
      fireBaseId,
    });
  }

  async registerMember(
    memberInfo: Partial<Member> & { password: string },
  ): Promise<Member> {
    await validateRegister(memberInfo, LoginType.MEMBER);
    const memberCreated = await this.memberService.createMember(memberInfo);
    let fireBaseId: string = "";
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        memberCreated.email,
        memberInfo.password,
      );
      await sendEmailVerification(userAuth.user);
      fireBaseId = userAuth.user.uid;
    } catch (error) {
      await this.memberService.deleteMember(memberCreated.memberId, false, "");
      throw new ApplicationError((error as Error).message);
    }
    return await this.memberService.updateMember(memberCreated.memberId, {
      fireBaseId,
    });
  }
}
