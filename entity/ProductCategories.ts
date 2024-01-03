import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Products } from "./Products.js";

@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @OneToMany("Products", (product: Products) => product.category)
  product: Products;

  @DeleteDateColumn()
  deleteDate?: Date;
}
