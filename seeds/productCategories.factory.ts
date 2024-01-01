import { Categories } from "../entity/ProductCategories.js";
import { setSeederFactory } from "typeorm-extension";

export const CategoryFactory = setSeederFactory(Categories, (faker) => {
  const category = new Categories();

  category.name = faker.word.noun();
  category.description = faker.lorem.sentence();

  return category;
});
