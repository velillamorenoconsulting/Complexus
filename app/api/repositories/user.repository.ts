import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { getDataSource } from "../database";
import { DatabaseError } from "../utils/errors";

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
    return this.repository!.findOne({
      where: {
        userId,
      },
      relations: {
        purchases: {
          event: true,
          item: true
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.init();
    return this.repository!.findOneBy({ email });
  }

  async updateById(userId: string, user: Partial<User>): Promise<User> {
    await this.init();
    const { affected } = await this.repository!.update({ userId }, user);
    if (!affected) throw new DatabaseError();
    const updatedUser = await this.findById(userId);
    return updatedUser!;
  }

  async create(user: User): Promise<User> {
    await this.init();
    const result = await this.repository!.save(user);
    return result;
  }

  async deleteUser(userId: string): Promise<number> {
    await this.init();
    const { affected } = await this.repository!.delete({ userId });
    if (!affected) throw new DatabaseError();
    return affected;
  }

  async softDeleteUser(userId: string): Promise<number> {
    await this.init();
    await this.repository!.update({ userId }, { isDeleted: true });
    const { affected } = await this.repository!.softDelete({ userId });
    if (!affected) throw new DatabaseError();
    return affected;
  }
}
