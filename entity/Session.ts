import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { HotelTable } from "./Table.js";
import type { Order } from "./Order.js";
import type { Customer } from "./Customer.js";

export type PaymentStatus = "paid" | "incomplete" | "not_paid";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne("HotelTable", (table: HotelTable) => table.session)
  @JoinColumn()
  hotel_table: HotelTable;

  @OneToMany("Order", (order: Order) => order.session)
  @JoinColumn()
  order: Order;

  @Column()
  bill_amount: number;

  @Column({
    type: "enum",
    enum: ["paid", "incomplete", "not_paid"],
    default: "not_paid",
  })
  payment_status: PaymentStatus;

  @OneToOne("Customer", (customer: Customer) => customer.session)
  @JoinColumn()
  customer: Customer;

  @CreateDateColumn()
  created_date: Date;
}
