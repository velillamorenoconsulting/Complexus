import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { generateNanoId } from "../utils/utils";
import { IsBoolean, IsOptional, IsString } from "class-validator";

@Entity("Participant")
export class Participant {
  @BeforeInsert()
  generateId() {
    this.participantId = generateNanoId(10);
  }

  @PrimaryColumn()
  participantId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @Column()
  @IsString()
  createdBy!: string;

  @Column()
  @IsString()
  updatedBy!: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @Column()
  @IsString()
  displayName!: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
