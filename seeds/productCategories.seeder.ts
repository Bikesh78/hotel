import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Categories } from "../entity/ProductCategories.js";

export class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryFactory = factoryManager.get(Categories);

    await categoryFactory.saveMany(5);
  }
}
