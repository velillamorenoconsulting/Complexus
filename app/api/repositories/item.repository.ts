import { Repository } from "typeorm";
import { Item } from "../entities/item.entity";
import { getDataSource } from "../database";

export class ItemRepository {
  private repo: Repository<Item> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const ds = await getDataSource();
      this.repo = ds.getRepository(Item);
    }
  }

  async getAllItems(): Promise<Item[]> {
    await this.init();
    return this.repo!.find({
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
}
