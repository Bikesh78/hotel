import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserRole } from "./UserRole.js";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column("text")
  password: string;

  @OneToOne(() => UserRole, (role) => role.user)
  @JoinColumn()
  role: UserRole;
}
