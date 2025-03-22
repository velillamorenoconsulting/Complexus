import { plainToInstance } from "class-transformer";
import { Item } from "../entities/item.entity";
import { ItemRepository } from "../repositories/item.repository";
import { validateOrReject } from "class-validator";
import { NotFoundError } from "../utils/errors";
import { handleValidationError } from "@/app/utils";

export class ItemService {
  private readonly itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getAllItems(valid?: boolean): Promise<Item[]> {
    return this.itemRepository.getAllItems(valid);
  }

  async createItem(itemToCreate: Partial<Item>): Promise<Item> {
    const receivedAttributes = {
      ...itemToCreate,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const itemAttributes = plainToInstance(Item, receivedAttributes);
    try {
      await validateOrReject(itemAttributes);
    } catch (e) {
      handleValidationError(e);
    }
    return this.itemRepository.createItem(itemAttributes);
  }

  async deleteItem(
    itemId: string,
    isSoft: boolean = true,
    author: string,
  ): Promise<string> {
    console.log(itemId);
    const item = await this.itemRepository.getItem(itemId);
    if (!item) throw new NotFoundError("Item");
    if (isSoft) {
      await this.itemRepository.softDeleteItem(itemId, author);
    } else {
      await this.itemRepository.deleteItem(itemId);
    }
    return item.itemId;
  }
}
