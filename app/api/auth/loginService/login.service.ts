import { signInWithEmailAndPassword } from "firebase/auth";
import { UserService } from "../../services/user.service";
import { auth } from "../firebase";
import { UnauthorizedError } from "../../utils/errors";
import { MemberService } from "../../services/member.service";
import { User } from "../../entities/user.entity";
import { Member } from "../../entities/member.entity";
import { SignedUser } from "../../types/auth.types";
import { generateToken } from "../utils/jwt";

export class LoginService {
  private readonly userService: UserService;
  private readonly memberService: MemberService;

  constructor() {
    this.userService = new UserService();
    this.memberService = new MemberService();
  }

  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<SignedUser> {
    if (!email || !password) throw new UnauthorizedError("Bad credentials");
    try {
      const fireBaseAuth = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!fireBaseAuth.user.emailVerified) {
        throw new UnauthorizedError("Verification missing");
      }
    } catch (error: any) {
      throw new UnauthorizedError(error.message ?? "Bad credentials");
    }
    const userInfo = await this.userService.getUserByEmail(email);
    if (userInfo.isDeleted) throw new UnauthorizedError("Not Allowed");
    const signedUser = {
      ...userInfo,
      token: generateToken(userInfo),
    };
    return signedUser;
  }

  async loginMember({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Member> {
    if (!email || !password) throw new UnauthorizedError("Bad credentials");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new UnauthorizedError("Bad credentials");
    }
    const memberInfo = await this.memberService.getMemberByEmail(email);
    if (memberInfo.isDeleted) throw new UnauthorizedError("Not Allowed");
    return memberInfo;
  }
}