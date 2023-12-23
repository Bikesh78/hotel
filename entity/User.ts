import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import type { UserRole } from "./UserRole.js";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  @IsEmail()
  username: string;

  @Column("text")
  password: string;

  // @OneToOne(() => UserRole, (role) => role.user)
  @OneToOne("UserRole", (role: UserRole) => role.user)
  @JoinColumn()
  role: UserRole;
}
