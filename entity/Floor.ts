import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { HotelTable } from "./Table.js";

@Entity()
export class Floor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @OneToMany("HotelTable", (table: HotelTable) => table.floor, {
    cascade: true,
  })
  hotel_table: HotelTable[];
  // @OneToMany("HotelTable", (table: HotelTable) => table.floor)
  // hotel_table: HotelTable[];
}
