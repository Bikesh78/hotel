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
import type { Floor } from "./Floor.js";
import type { Session } from "./Session.js";

export enum TableState {
  VACANT = "vacant",
  OCCUPIED = "occupied",
  UNAVAILABLE = "unavailable",
}

@Entity()
export class HotelTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  capacity: number;

  @Column({ type: "enum", enum: TableState, default: TableState.VACANT })
  state: TableState;

  @ManyToOne("Floor", (floor: Floor) => floor.hotel_table)
  @JoinColumn({ name: "floor_id" })
  // @JoinColumn()
  // floor: Floor;
  floor: number;

  @OneToMany("Session", (session: Session) => session.hotel_table)
  session: Session;

  // @ManyToMany("Product", (product: Products) => product.table)
  // @JoinColumn()
  // product: Products;
}
