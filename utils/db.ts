import { User, UserRole } from "../entity/index.js";
import { DataSource } from "typeorm";
import { DB_PASSWORD, DB_USER } from "./config.js";
import "reflect-metadata";
import { UserAndRoleCreate1703260907295 } from "../migration/1703260907295-UserAndRoleCreate.js";
import { migrations } from "../migration/index.js";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: DB_USER,
  password: DB_PASSWORD,
  database: "hotel",
  port: 3306,
  entities: [User, UserRole],
  synchronize: false,
  logging: false,
  migrations: migrations,
  // migrationsTableName: "custom_migration_table",
  // entitySkipConstructor: true, // Indicates that TypeORM will skip constructors when deserializing entities from the database
});

export const connectToDatabase = async () => {
  try {
    await appDataSource.initialize();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
