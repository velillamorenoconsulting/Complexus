import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
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

  @Column()
  @IsArray()
  images!: string[];

  @Column()
  @IsEnum(ItemType)
  itemType!: ItemType;

  @Column()
  @IsString()
  description!: string;

  @Column({ default: [] })
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
  @IsInt()
  stock!: number;

  @OneToMany(() => Purchase, (purchase) => purchase.item)
  purchases!: Purchase[];
}
