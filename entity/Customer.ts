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

  @Column({type:"varchar"})
  name: string;

  @Column({ default: 0, type:"number" })
  due_amount: number;

  @Column({ default: 0 , type:"number"})
  paid_amount: number;

  @OneToMany("Session", (session: Session) => session.customer)
  @JoinColumn({ name: "session_id" })
  // session: Session;
  session: number;
}
