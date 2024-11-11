import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import {
  IsArray,
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

  @Column()
  @IsString()
  createdBy!: string;

  @Column()
  @IsString()
  updatedBy!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  @IsInt()
  stock!: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  imageFolder?: string;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases!: Relation<Purchase>[];
}
