import { DataSource, DataSourceOptions } from "typeorm";
import { DB_PASSWORD, DB_USER } from "./config.js";
import "reflect-metadata";
import { SeederOptions, runSeeders } from "typeorm-extension";
import { CategorySeeder } from "../seeds/productCategories.seeder.js";
import { CategoryFactory } from "../seeds/productCategories.factory.js";

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: "localhost",
  username: DB_USER,
  password: DB_PASSWORD,
  database: "hotel",
  port: 3306,
  entities: ["entity/**/*.ts"],
  synchronize: false,
  logging: false,
  migrations: ["migration/*.ts"],
  // seeds: ["seeds/**/*.seeder.ts"],
  // factories: ["seeds/**/*.factory.ts"],
  // seeds: [CategorySeeder],
  // factories: [CategoryFactory],
};

export const appDataSource = new DataSource(options);

export const connectToDatabase = async () => {
  try {
    await appDataSource.initialize();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const seedDatabase = async () => {
  await runSeeders(appDataSource, {
    seeds: [CategorySeeder],
    factories: [CategoryFactory],
  });
};
