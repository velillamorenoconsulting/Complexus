import { plainToInstance } from "class-transformer";
import { User } from "../entities/user.entity";
import { UserRepostitory } from "../repositories/user.repository";
import { ValidationError, validateOrReject } from "class-validator";
import { NotFoundError } from "../utils/errors";
import { ValidateError } from "../utils/errors";

export class UserService {
  private userRepository: UserRepostitory;

  constructor() {
    this.userRepository = new UserRepostitory();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User");
    return user;
  }

  async getUserByEmail(
    userEmail: string,
    throwError: boolean = true,
  ): Promise<User> {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user && throwError) throw new NotFoundError("User");
    return user as User;
  }

  async updateUser(userId: string, payload: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User");
    return this.userRepository.updateById(userId, payload);
  }

  async createUser(user: Partial<User>): Promise<User> {
    const userReceivedAttributes = {
      ...user,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const userToCreate = plainToInstance(User, userReceivedAttributes);
    try {
      await validateOrReject(userToCreate);
    } catch (error: any) {
      const constraints = error.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.userRepository.create(userToCreate);
  }

  async deleteUser(userId: string, isSoft: boolean = true): Promise<string> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User");
    let deleted: number;
    if (isSoft) {
      deleted = await this.userRepository.softDeleteUser(userId);
    } else {
      deleted = await this.userRepository.deleteUser(userId);
    }
    return user.userId;
  }
}
