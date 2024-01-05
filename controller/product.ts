import { NextFunction, Request, Response } from "express";
import { Products } from "../entity/Products.js";
import { validate } from "class-validator";
import { Variations } from "../entity/Variations.js";
import { Categories } from "../entity/ProductCategories.js";

interface variations {
  name: string;
  description: string;
  price: number;
  product: number;
}

interface body {
  name: string;
  description: string;
  base_price?: number;
  is_bar_item: boolean;
  variations?: variations[];
  category_id: number;
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Products.find({
      relations: {
        variations: true,
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
          description: true,
        },
      },
    });

    if (products) {
      return res.json({ data: products });
    }
  } catch (error) {
    next(error);
  }
};

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: body = req.body;
    const {
      name,
      description,
      base_price,
      is_bar_item,
      variations,
      category_id,
    } = body;

    const product = new Products();
    product.name = name;
    product.description = description;
    product.is_bar_item = is_bar_item ? true : false;

    const category = await Categories.findOne({ where: { id: category_id } });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    product.category = category;

    const errors = await validate(product);

    if (errors.length > 0) {
      next(errors);
      throw new Error("Validation failed");
    }

    if (!variations) {
      product.base_price = base_price as number;
      await product.save();
    } else {
      // save product first to get product id required for variation
      await product.save();

      variations?.forEach(async (variationData) => {
        const variationEntity = new Variations();
        const { name, description, price } = variationData;

        variationEntity.name = name;
        variationEntity.description = description;
        variationEntity.price = price;
        variationEntity.product = product;

        // product.variations = product.variations
        //   ? [...product.variations, variationEntity]
        //   : [variationEntity];

        await variationEntity.save();
      });
    }

    delete product.category.deleteDate;

    return res.json({ product: { ...product, variations } });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await Products.findOneBy({ id: id });
    if (!product) {
      return res.status(404).json({ error: "404 not found" });
    }

    await product.remove();

    res.json({ message: "Deleted Succesfully" });
  } catch (error) {
    next(error);
  }
};
