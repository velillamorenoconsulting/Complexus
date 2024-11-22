import { Repository } from "typeorm";
import { Testimony } from "../entities/testimony.entity";
import { getDataSource } from "../database";

export class TestimonyRepository {
  private repo: Repository<Testimony> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const ds = await getDataSource();
      this.repo = ds.getRepository(Testimony);
    }
  }

  async findAll(priority?: number): Promise<Testimony[]> {
    await this.init();
    return this.repo!.find({
      where: {
        ...(priority && {
          priority,
          isApproved: true,
          isDeleted: false,
        }),
      },
      relations: { user: true, member: true },
    });
  }

  async create(testimony: Testimony): Promise<Testimony> {
    await this.init();
    const result = await this.repo!.save(testimony);
    return testimony;
  }
}
