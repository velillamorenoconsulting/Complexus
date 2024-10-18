import { validateOrReject, ValidationError } from "class-validator";
import { Purchase } from "../entities/purchase.entity";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { NotFoundError, ValidateError } from "../utils/errors";
import { plainToInstance } from "class-transformer";

export class PurchaseService {
  private purchaseRepository: PurchaseRepository;

  constructor() {
    this.purchaseRepository = new PurchaseRepository();
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.findAll();
  }

  async findPurchaseById(purchaseId: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findById(purchaseId);
    if (!purchase) throw new NotFoundError("Purchase");
    return purchase;
  }

  async createPurchase(purchase: any): Promise<Purchase> {
    const purchaseReceivedAttributes = {
      ...purchase,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    };
    const purchaseToCreate = plainToInstance(
      Purchase,
      purchaseReceivedAttributes,
    );
    try {
      await validateOrReject(purchaseToCreate);
    } catch (error: any) {
      const constraints = error.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    return this.purchaseRepository.create(purchaseToCreate);
  }
}
