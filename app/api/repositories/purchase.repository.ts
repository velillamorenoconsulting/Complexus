import { FindOptionsWhere, LessThan, MoreThan, Repository } from "typeorm";
import { Purchase } from "../entities/purchase.entity";
import { getDataSource } from "../database";
import { removeNullOrUndefined } from "../utils/utils";
import { ValidPurchaseFilters } from "../types/entities.types";

export class PurchaseRepository {
  private repo: Repository<Purchase> | null = null;

  private async init(): Promise<void> {
    if (!this.repo) {
      const dataSource = await getDataSource();
      this.repo = dataSource.getRepository(Purchase);
    }
  }

  async findAll(): Promise<Purchase[]> {
    await this.init();
    return this.repo!.find();
  }

  async findById(purchaseId: string): Promise<Purchase | null> {
    await this.init();
    return this.repo!.findOneBy({ purchaseId });
  }

  async findPurchasesByUser(userId: string): Promise<Purchase[]> {
    await this.init();
    return this.repo!.find({
      where: {
        userBuyer: {
          userId,
        },
      },
    });
  }

  async findPurchasesByTimeRange(
    startDate: Date,
    endDate?: Date,
  ): Promise<Purchase[]> {
    await this.init();
    return this.repo!.find({
      where: {
        isConfirmed: true,
        confirmedAt: MoreThan(startDate) && LessThan(endDate ?? new Date()),
      },
    });
  }

  async findPurchasesByMember(memberId: string): Promise<Purchase[]> {
    await this.init();
    return this.repo!.find({
      where: {
        memberBuyer: {
          memberId,
        },
      },
    });
  }

  async findPurchaseByAttribute(
    attributes: Partial<ValidPurchaseFilters>,
  ): Promise<Purchase[]> {
    await this.init();
    return this.repo!.find({
      where: removeNullOrUndefined(attributes) as FindOptionsWhere<Purchase>,
    });
  }

  async create(purchase: Partial<Purchase>): Promise<Purchase> {
    await this.init();
    return this.repo!.save(purchase);
  }
}
