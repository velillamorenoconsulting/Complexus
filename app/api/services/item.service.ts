import { plainToInstance } from "class-transformer";
import { Item } from "../entities/item.entity";
import { ItemRepository } from "../repositories/item.repository";
import { validateOrReject, ValidationError } from "class-validator";
import { NotFoundError, ValidateError } from "../utils/errors";

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
    } catch (e: any) {
      const constraints = e.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
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
    let deleted: number;
    if (isSoft) {
      deleted = await this.itemRepository.softDeleteItem(itemId, author);
    } else {
      deleted = await this.itemRepository.deleteItem(itemId);
    }
    return item.itemId;
  }
}
