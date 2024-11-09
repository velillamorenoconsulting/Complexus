import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "./user.entity";
import { Member } from "./member.entity";

@Entity("Testimony")
export class Testimony {
  @BeforeInsert()
  generateId() {
    this.testimonyId = generateNanoId(24);
  }

  @PrimaryColumn()
  testimonyId!: string;

  @Column()
  @IsString()
  title!: string;

  @Column()
  @IsString()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  @IsString()
  createdBy!: string;

  @Column()
  @IsString()
  updatedBy!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @Column()
  @IsString()
  @IsOptional()
  approvedBy!: string;

  @Column()
  @IsNumber()
  priority!: number;

  @ManyToOne(() => User, (user) => user.testimonies, { nullable: true })
  user?: Relation<User>;

  @ManyToOne(() => Member, (member) => member.testimonies, { nullable: true })
  member?: Relation<Member>;
}
