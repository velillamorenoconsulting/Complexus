import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsArray, IsDate, IsDateString, IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";
import { Purchase } from "./purchase.entity";

@Entity("Event")
export class Event {
  @BeforeInsert()
  generateId() {
    this.eventId = generateNanoId(24);
  }

  @PrimaryColumn()
  eventId!: string;

  @Column()
  @IsString()
  title!: string;

  @Column()
  @IsString()
  description!: string;

  @Column()
  @IsDateString()
  startAt!: Date;

  @Column({ nullable: true })
  @IsDateString()
  @IsOptional()
  endAt?: Date;

  @Column("jsonb", { nullable: true, default: [] })
  @IsArray()
  @IsOptional()
  images!: string[];

  @Column()
  @IsString()
  location!: string;

  @Column("float")
  @IsNumber()
  price!: number;

  @OneToMany(() => Purchase, (purchase) => purchase.event)
  purchases!: Relation<Purchase>[];
}
