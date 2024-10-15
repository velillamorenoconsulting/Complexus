import {
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
import { generateNanoId } from "../utils/utils";
import { IsBoolean, IsDecimal, IsOptional, IsString } from "class-validator";
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

  @Column({ default: 0.0 })
  @IsDecimal()
  @IsOptional()
  tax!: number;

  @Column()
  @IsBoolean()
  isEvent!: boolean;

  @Column()
  @IsOptional()
  confirmationId!: string;

  @Column()
  @IsOptional()
  confirmedAt!: Date;

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
  item?: Item;

  @ManyToOne(() => Event, (event) => event.purchases, { nullable: true })
  event?: Event;

  @BeforeInsert()
  @BeforeUpdate()
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
  }
}
