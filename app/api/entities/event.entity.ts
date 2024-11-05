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
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { Purchase } from "./purchase.entity";
import { Question } from "./question.entity";

export class Segment {
  title?: string;
  text?: string;
  list?: string[];
  metadata?: string;
}

export class Participant {
  logo?: string;
  name?: string;
  metadata?: string;
}

export class Location {
  ubication!: string;
  address?: string;
  description?: string;
  metadata?: string;
}

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

  @Column("jsonb", { nullable: true })
  @IsArray()
  segments!: Segment[];

  @Column("jsonb", { nullable: true, default: [] })
  @IsOptional()
  @IsArray()
  sponsors?: Participant[];

  @Column("jsonb", { nullable: true, default: [] })
  @IsOptional()
  @IsArray()
  supporters?: Participant[];

  @Column("jsonb", { nullable: true, default: [] })
  @IsOptional()
  @IsArray()
  inviters?: Participant[];

  @Column({ nullable: true })
  @IsOptional()
  video?: string;

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

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  imageFolder?: string;

  @Column("jsonb", { nullable: true })
  @IsObject()
  location!: Location;

  @Column("float")
  @IsNumber()
  price!: number;

  @OneToMany(() => Purchase, (purchase) => purchase.event)
  purchases!: Relation<Purchase>[];

  @OneToMany(() => Question, (question) => question.event)
  questions!: Relation<Question>[];
}
