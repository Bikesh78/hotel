import { DataSource } from "typeorm";
import { User, UserRole } from "../entity/index.js";
import { DB_PASSWORD, DB_USER } from "./config.js";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: DB_USER,
  password: DB_PASSWORD,
  database: "hotel",
  port: 3306,
  entities: [User, UserRole],
  synchronize: true,
  logging: false,
  // entitySkipConstructor: true, // Indicates that TypeORM will skip constructors when deserializing entities from the database
});
