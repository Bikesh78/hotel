import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Session } from "./Session.js";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  due_amount: number;

  @Column()
  paid_amount: number;

  @OneToMany("Session", (session: Session) => session.customer)
  @JoinColumn({ name: "session_id" })
  // session: Session;
  session: number;
}
