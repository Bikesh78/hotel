import { Request, Response, NextFunction } from "express";
import { Floor } from "../entity/Floor.js";

interface floorBody {
  name: string;
  description?: string;
}

export const getFloors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const floors = await Floor.find();
    res.json({ data: floors });
  } catch (error) {
    next(error);
  }
};

export const postFloor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: floorBody = req.body;
    const { name, description } = body;

    const floor = new Floor();
    floor.name = name;
    floor.description = description ?? "";

    await floor.save();

    res.json({ message: "Floor created succesfully", data: floor });
  } catch (error) {
    next(error);
  }
};

export const deleteFloor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const floor = await Floor.findOneBy({ id: id });
    if (!floor) {
      res.status(404).json({ error: "404 not found" });
    }

    await floor?.remove();

    res.json({ message: `Deleted floor ${id} succesfully` });
  } catch (error) {
    next(error);
  }
};
