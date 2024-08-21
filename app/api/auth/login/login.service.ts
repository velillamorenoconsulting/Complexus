import { signInWithEmailAndPassword } from "firebase/auth";
import { UserService } from "../../services/user.service";
import { auth } from "../firebase";
import { UnauthorizedError } from "../../utils/errors";
import { generateToken } from "../utils/jwt";
import { MemberService } from "../../services/member.service";

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
  }): Promise<string> {
    if (!email || !password) throw new UnauthorizedError("Bad credentials");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new UnauthorizedError("Bad credentials");
    }
    const userInfo = await this.userService.getUserByEmail(email);
    if (userInfo.isDeleted) throw new UnauthorizedError("Not Allowed");
    return generateToken(userInfo);
  }

  async loginMember({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    if (!email || !password) throw new UnauthorizedError("Bad credentials");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new UnauthorizedError("Bad credentials");
    }
    const memberInfo = await this.memberService.getMemberByEmail(email);
    if (memberInfo.isDeleted) throw new UnauthorizedError("Not Allowed");
    return generateToken(memberInfo);
  }
}
