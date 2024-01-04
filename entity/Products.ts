import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Categories } from "./ProductCategories.js";
import type { Variations } from "./Variations.js";
import type { Order } from "./Order.js";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  base_price: number;

  @Column()
  is_bar_item: boolean;

  @OneToMany("Variations", (variations: Variations) => variations.product)
  variations: Variations[];

  @ManyToOne("Categories", (categories: Categories) => categories.product, {
    cascade: true,
  })
  @JoinColumn()
  category: Categories;

  @ManyToMany("Order", (order: Order) => order.product)
  orderInstance: Order;

  // if variation is null
  // @ManyToMany("Table", (table: Table) => table.product)
  // table: Table;
}
