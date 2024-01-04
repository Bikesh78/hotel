import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { Floor } from "../entity/Floor.js";
import { HotelTable, TableState } from "../entity/Table.js";

interface tableBody {
  name: string;
  capacity: number;
  state?: TableState;
  floor_id: number;
}

export const getTables = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tables = await HotelTable.find();
    res.json({ data: tables });
  } catch (error) {
    next(error);
  }
};

export const postTable = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const { name, capacity, state, floor_id } = body;

    const table = new HotelTable();
    table.name = name;
    table.capacity = capacity;
    table.state = state || TableState.VACANT;
    const floor = await Floor.findOne({
      where: {
        id: floor_id,
      },
    });

    if (!floor) {
      return res.status(404).json({ error: "Floor not found" });
    }
    table.floor = floor_id;

    await table.save();

    res.json({ message: "Table created succesfully", data: table });
  } catch (error) {
    next(error);
  }
};

export const deleteTable = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const table = await HotelTable.findOneBy({ id: id });
    if (!table) {
      res.status(404).json("404 not found");
    }

    await table?.remove();

    res.json({ message: `Deleted table ${id} succesfully` });
  } catch (error) {
    next(error);
  }
};
