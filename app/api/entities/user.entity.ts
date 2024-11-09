import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { Purchase } from "./purchase.entity";
import { Question } from "./question.entity";
import { Testimony } from "./testimony.entity";

@Entity("User")
export class User {
  @BeforeInsert()
  generateId() {
    this.userId = generateNanoId(22);
  }

  @PrimaryColumn()
  userId!: string;

  @Column({ nullable: true })
  @IsString({ message: "fireBaseId must be a string" })
  @IsOptional() // Optional if the field is nullable
  fireBaseId!: string;

  @Column()
  @IsString({ message: "First name must be a string" })
  firstName!: string;

  @Column()
  @IsString({ message: "Last name must be a string" })
  lastName!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @Column({ nullable: true })
  @IsString({ message: "Avatar URL must be a string" })
  @IsOptional()
  avatarUrl!: string;

  @Column()
  @IsString({ message: "Created by must be a string" })
  createdBy!: string;

  @Column()
  @IsString({ message: "Updated by must be a string" })
  updatedBy!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isDeleted!: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.userBuyer)
  purchases!: Relation<Purchase>[];

  @OneToMany(() => Question, (question) => question.author)
  questions!: Relation<Question>[];

  @OneToMany(() => Testimony, (testimony) => testimony.user, { nullable: true })
  testimonies!: Relation<Testimony>[] | null;
}
