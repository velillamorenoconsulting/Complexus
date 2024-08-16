import { UserRepostitory } from "../repositories/User.repository";

export class UserService {
  constructor(readonly userRepository: UserRepostitory) {}

  async getUserById(userId: string) {
    this.userRepository.findUser(userId);
  }
}
