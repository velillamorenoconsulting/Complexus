import { AppDataSource } from "../database";
import { User } from "../entities/user";

export const userRepository = AppDataSource.getRepository(User);

export class UserRepostitory {
  async findUser(userId: string) {
    // TODO Change this to findByUnique
    return await userRepository.findOneBy({ userId });
  }
}
