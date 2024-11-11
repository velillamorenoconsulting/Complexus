import { plainToInstance } from "class-transformer";
import { Item } from "../entities/item.entity";
import { ItemRepository } from "../repositories/item.repository";
import { validateOrReject, ValidationError } from "class-validator";
import { ValidateError } from "../utils/errors";

export class ItemService {
  private readonly itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.getAllItems();
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
}
