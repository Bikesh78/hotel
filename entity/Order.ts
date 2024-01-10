import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  // product: Products;

  @ManyToOne("Variations", (variation: Variations) => variation.orderInstance)
  @JoinColumn()
  variation: number;
  // variation: Variations;

  @Column()
  quantity: number;

  @Column()
  note: string;

  @Column({
    type: "enum",
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  })
  status: OrderStatus;

  @ManyToOne("Session", (session: Session) => session.order)
  @JoinColumn()
  session: number;
}
