import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsArray, IsDate, IsDecimal, IsString } from "class-validator";
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
  @IsDate()
  startAt!: Date;

  @Column()
  @IsDate()
  endAt!: Date;

  @Column("jsonb", { nullable: true, default: [] })
  @IsArray()
  images!: string[];

  @Column()
  @IsString()
  location!: string;

  @Column("float")
  @IsDecimal()
  price!: number;

  @OneToMany(() => Purchase, (purchase) => purchase.event)
  purchases!: Purchase[];
}
