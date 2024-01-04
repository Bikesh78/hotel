import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Table } from "./Table.js";

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

  @OneToMany("Table", (table: Table) => table.floor)
  table: Table;
}
