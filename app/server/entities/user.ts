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

@Entity()
export class User {
  @BeforeInsert()
  generateId() {
    this.userId = generateNanoId(22);
  }

  @PrimaryColumn()
  userId!: string;

  @Column({ nullable: true })
  fireBaseId!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  @Column()
  createdBy!: string;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
