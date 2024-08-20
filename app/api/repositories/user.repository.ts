import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { getDataSource } from "../database";

export class UserRepostitory {
  private repository: Repository<User> | null = null;

  private async init(): Promise<void> {
    if (!this.repository) {
      const dataSource = await getDataSource();
      this.repository = dataSource.getRepository(User);
    }
  }

  async findAll(): Promise<User[]> {
    await this.init();
    return this.repository!.find();
  }

  async findById(userId: string): Promise<User | null> {
    await this.init();
    return this.repository!.findOneBy({ userId });
  }

  async create(user: User): Promise<User> {
    await this.init();
    const result = await this.repository!.save(user);
    return result;
  }
}
