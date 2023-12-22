import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";

@Entity({ name: "user_role" })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  role: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
