import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Products } from "./Products.js";
import type { Order } from "./Order.js";

@Entity()
export class Variations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar"})
  name: string;

  @Column({ nullable: true, type:"varchar" })
  description: string;

  @Column({type:"number"})
  price: number;

  @ManyToOne("Products", (products: Products) => products.variations, {
    cascade: true,
  })
  @JoinColumn()
  product: Products;

  @OneToMany("Order", (order: Order) => order.variation)
  // orderInstance: Order;
  orderInstance: number;
}
