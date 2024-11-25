import { Repository } from "typeorm";
import { Item } from "../entities/item.entity";
import { getDataSource } from "../database";
import { DatabaseError } from "../utils/errors";

export class ItemRepository {
  private repo: Repository<Item> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const ds = await getDataSource();
      this.repo = ds.getRepository(Item);
    }
  }

  async getItem(itemId: string): Promise<Item | null> {
    await this.init();
    return this.repo!.findOneBy({ itemId });
  }

  async getAllItems(valid: boolean = false): Promise<Item[]> {
    await this.init();
    return this.repo!.find({
      withDeleted: !valid,
      relations: {
        purchases: true,
      },
    });
  }

  async createItem(item: Item): Promise<Item> {
    await this.init();
    const createdItem = await this.repo!.save(item);
    return createdItem;
  }

  async deleteItem(itemId: string): Promise<number> {
    this.init();
    const { affected } = await this.repo!.delete({ itemId });
    if (!affected) throw new DatabaseError();
    return affected;
  }

  async softDeleteItem(itemId: string, author: string): Promise<number> {
    await this.init();
    await this.repo!.update({ itemId }, { isDeleted: true, updatedBy: author });
    const { affected } = await this.repo!.softDelete({ itemId });
    if (!affected) throw new DatabaseError();
    return affected;
  }
}
