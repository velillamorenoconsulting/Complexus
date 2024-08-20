import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsEmail, IsOptional, IsString } from "class-validator";

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
}
