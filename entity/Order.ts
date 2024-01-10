import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Products } from "./Products.js";
import type { Variations } from "./Variations.js";
import type { Session } from "./Session.js";

export type OrderStatus = "pending" | "delivered" | "cancelled";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("Products", (product: Products) => product.orderInstance)
  @JoinColumn()
  product: number;

  @ManyToOne("Variations", (variation: Variations) => variation.orderInstance)
  @JoinColumn()
  variation: number;

  @Column()
  quantity: number;

  @Column({
    type: "enum",
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  })
  status: OrderStatus;

  @ManyToOne("Session", (session: Session) => session.order)
  session: number;
}
