import { validateOrReject } from "class-validator";
import { Purchase } from "../entities/purchase.entity";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { NotFoundError } from "../utils/errors";
import { plainToInstance } from "class-transformer";
import { handleValidationError } from "@/app/utils";

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

  async createPurchase(purchase: Partial<Purchase>): Promise<Purchase> {
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
    } catch (error) {
      handleValidationError(error);
    }
    return this.purchaseRepository.create(purchaseToCreate);
  }
}
