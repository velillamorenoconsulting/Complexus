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
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { Purchase } from "./purchase.entity";

@Entity("Member")
export class Member {
  @BeforeInsert()
  generateId() {
    this.memberId = generateNanoId(22);
  }

  @PrimaryColumn()
  memberId!: string;

  @Column({ nullable: true })
  @IsString({ message: "fireBaseId must be a string" })
  @IsOptional()
  fireBaseId!: string;

  @Column()
  @IsString({ message: "First name must be a string" })
  fistName!: string;

  @Column()
  @IsString({ message: "Last name must be a string" })
  lastName!: string;

  @Column({ default: false })
  @IsBoolean({ message: "Admin attribute must be a boolean" })
  @IsOptional()
  isAdmin?: boolean;

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

  @OneToMany(() => Purchase, (purchase) => purchase.memberBuyer, {
    nullable: true,
  })
  purchases!: Relation<Purchase>[] | null;
}
