import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { ItemType } from "../types/entities.types";
import { Purchase } from "./purchase.entity";

@Entity("Item")
export class Item {
  @BeforeInsert()
  generateId() {
    this.itemId = generateNanoId(30);
  }

  @PrimaryColumn()
  itemId!: string;

  @Column()
  @IsString()
  title!: string;

  @Column("jsonb", { nullable: true })
  @IsArray()
  images!: string[];

  @Column()
  @IsEnum(ItemType)
  itemType!: string;

  @Column()
  @IsString()
  description!: string;

  @Column("jsonb", { default: [] })
  @IsArray()
  additionalDescription!: string[];

  @Column({ default: 1.0 })
  @IsDecimal()
  @IsOptional()
  multiplier!: number;

  @Column()
  @IsDecimal()
  price!: number;

  @Column({ nullable: true })
  @IsString()
  createdBy!: string;

  @Column({ nullable: true })
  @IsString()
  updatedBy!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true, default: false })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @Column()
  @IsInt()
  stock!: number;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases!: Relation<Purchase>[];
}
