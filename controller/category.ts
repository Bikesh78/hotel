import express, { Request, Response, NextFunction } from "express";
import { Categories } from "../entity/ProductCategories.js";
import { validate } from "class-validator";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Categories.find();
    if (categories) {
      return res.json({ data: categories });
    }
  } catch (error) {
    next(error);
  }
};

export const postCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { name, description } = body;

    const category = new Categories();

    category.name = name;
    category.description = description;

    const errors = await validate(category);

    if (errors.length > 0) {
      next(errors);
      throw new Error("Validation failed");
    }

    await category.save();

    return res.json({ category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);

    const category = await Categories.findOneBy({ id: id });

    await category?.softRemove();
    res.json({ message: "Deleted succesfully" });
  } catch (error) {
    next(error);
  }
};
