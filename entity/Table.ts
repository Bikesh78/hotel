import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Floor } from "./Floor.js";
import type { Products } from "./Products.js";
import type { Session } from "./Session.js";

export enum TableState {
  VACANT = "vacant",
  OCCUPIED = "occupied",
  UNAVAILABLE = "unavailable",
}

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  capacity: number;

  @Column({ type: "enum", enum: TableState, default: TableState.VACANT })
  state: TableState;

  @OneToOne("Floor", (floor: Floor) => floor.table)
  @JoinColumn()
  floor: Floor;

  @OneToMany("Session", (session: Session) => session.table)
  session: Session;

  // @ManyToMany("Product", (product: Products) => product.table)
  // @JoinColumn()
  // product: Products;
}
