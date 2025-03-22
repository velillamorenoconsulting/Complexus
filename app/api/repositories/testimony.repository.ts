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
    const where = {
      ...(priority && {
        priority,
        isApproved: true,
        isDeleted: false,
      }),
    };
    return this.repo!.find({
      withDeleted: !priority,
      where,
      relations: { user: true, member: true },
    });
  }

  async getTestimony(testimonyId: string): Promise<Testimony | null> {
    await this.init();
    return this.repo!.findOneBy({ testimonyId });
  }

  async create(testimony: Testimony): Promise<Testimony> {
    await this.init();
    return await this.repo!.save(testimony);
  }

  async delete(testimonyId: string): Promise<boolean> {
    await this.init();
    const result = await this.repo!.softDelete({ testimonyId });
    return !!result.affected;
  }

  async update(
    testimonyId: string,
    updatedFields: Partial<Testimony>,
  ): Promise<boolean> {
    await this.init();
    const result = this.repo!.update({ testimonyId }, updatedFields);
    return !!result;
  }
}
