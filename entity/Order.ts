import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Products } from "./Products.js";
import type { Variations } from "./Variations.js";
import type { Session } from "./Session.js";

// export type OrderStatus = "pending" | "delivered" | "cancelled";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany("Products", (product: Products) => product.orderInstance)
  @JoinColumn()
  product: Products;

  @ManyToMany("Variations", (variation: Variations) => variation.orderInstance)
  @JoinColumn()
  variation: Variations;

  @Column()
  quantity: number;

  // @Column({
  //   type: "enum",
  //   enum: ["pending", "delivered", "cancelled"],
  //   default: "pending",
  // })
  // status: OrderStatus;

  @OneToOne("Session", (session: Session) => session.order)
  session: Session;
}
