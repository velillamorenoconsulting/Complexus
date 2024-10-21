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
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Purchase } from "./purchase.entity";
import { Question } from "./question.entity";

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  @IsString()
  createdBy!: string;

  @Column({ nullable: true })
  @IsString()
  updatedBy!: string;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isDeleted!: boolean;

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

  @OneToMany(() => Question, (question) => question.event)
  questions!: Relation<Question>[];
}
