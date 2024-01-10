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
  @JoinColumn({ name: "product_id" })
  product: number;
  // product: Products;

  @ManyToOne("Variations", (variation: Variations) => variation.orderInstance)
  @JoinColumn({ name: "variation_id" })
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
  @JoinColumn({ name: "session_id" })
  session: number;
}
