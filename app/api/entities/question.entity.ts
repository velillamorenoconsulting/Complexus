import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import type { Relation } from "typeorm";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity("Question")
export class Question {
  @BeforeInsert()
  generateId() {
    this.questionId = generateNanoId(36);
  }

  @PrimaryColumn()
  questionId!: string;

  @Column()
  @IsString()
  questionContent!: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  additionalDescription?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  approvedBy?: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isGeneralQuestion?: boolean;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  response?: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isAnswered?: boolean;

  @Column({ default: "hidden" })
  @IsString()
  @IsOptional()
  visibility!: "hidden" | "general";

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  questionTo?: string;

  @Column({ nullable: true })
  @IsOptional()
  approvedAt?: Date;

  @ManyToOne(() => User, (user) => user.questions)
  author!: Relation<User>;

  @ManyToOne(() => Event, (event) => event.questions)
  event!: Relation<Event>;

  @BeforeInsert()
  validateQuestion() {
    if (!this.author) throw new Error("No author information");
    if (!this.event) throw new Error("No event information");

    if (!this.isGeneralQuestion && !this.questionTo) {
      throw new Error("If no general question a receiver must be sent");
    }
  }
}
