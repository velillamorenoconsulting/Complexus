import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserService } from "../../services/user.service";
import { auth } from "../firebase";
import { validateUserRegister } from "../utils/validateUserInfo";
import { ValidateError } from "../../utils/errors";
import { User } from "../../entities/user.entity";

export class RegisterService {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async registerUser(userInfo: any): Promise<User> {
    validateUserRegister(userInfo);
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
}
