import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Categories } from "./ProductCategories.js";
import type { Variations } from "./Variations.js";

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
  variations: Variations;

  @ManyToOne("Categories", (categories: Categories) => categories.product)
  @JoinColumn()
  category: Categories;
}
