import {
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  Collection,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { generateNanoId } from "../utils/utils";
import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Item } from "./item.entity";
import { User } from "./user.entity";
import { Member } from "./member.entity";
import { Event } from "./event.entity";

@Entity("Purchase")
export class Purchase {
  @BeforeInsert()
  generateId() {
    this.purchaseId = generateNanoId(35);
  }

  @PrimaryColumn()
  purchaseId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  @IsDecimal()
  tax!: string;

  @Column()
  @IsBoolean()
  isEvent!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  confirmationId?: string;

  @Column({ nullable: true })
  @IsOptional()
  confirmedAt!: Date;

  @Column()
  @IsDecimal()
  basePrice!: string;

  @Column()
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @Column()
  @IsBoolean()
  isMemberPurchase!: boolean;

  @ManyToOne(() => User, (user) => user.purchases, { nullable: true })
  userBuyer!: User | null;

  @ManyToOne(() => Member, (member) => member.purchases, { nullable: true })
  memberBuyer!: Member | null;

  @Column()
  @IsString()
  buyerId!: string;

  @Column({ default: false })
  isConfirmed!: boolean;

  @ManyToOne(() => Item, (item) => item.purchases, { nullable: true })
  item?: Relation<Item>;

  @ManyToOne(() => Event, (event) => event.purchases, { nullable: true })
  event?: Relation<Event>;

  @BeforeInsert()
  validatePurchase() {
    if (this.event && this.item) {
      throw new Error(
        "Purchase can be related to either an event or an item, but not both."
      );
    }
    if (!this.event && !this.item) {
      throw new Error(
        "Purchase must be related to either an event or an item."
      );
    }
    if (this.memberBuyer && this.userBuyer) {
      throw new Error("Buyer can be either Member or User");
    }
    if (!this.memberBuyer && !this.userBuyer) {
      throw new Error("No Buyer information provided");
    }

    const calculatedPrice =
      parseFloat(this.basePrice) / (1 + parseFloat(this.tax));
    this.totalPrice = Math.trunc(calculatedPrice);
  }
}
