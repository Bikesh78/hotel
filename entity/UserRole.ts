import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { User } from "./User.js";

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  role: string;

  @OneToMany("User", (user: User) => user.role)
  user: User;
}
