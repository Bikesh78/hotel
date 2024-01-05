import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../utils/db.js";
import { Customer } from "../entity/Customer.js";

interface Body {
  name: string;
  due_amount?: number;
  paid_amount?: number;
  // session_id?: number;
}

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customerRepositry = appDataSource.getRepository(Customer);
    const customers = await customerRepositry.find();
    res.send(customers);
  } catch (error) {
    next(error);
  }
};

export const postCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: Body = req.body;
    const { name, due_amount, paid_amount } = body;
    const customerRepositry = appDataSource.getRepository(Customer);
    const customer = customerRepositry.create({
      name,
      due_amount,
      paid_amount,
    });
    const results = await customerRepositry.save(customer);

    res.send(results);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customerRepositry = appDataSource.getRepository(Customer);
    const customer = await customerRepositry.findOneBy({
      id: Number(req.params.id),
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const results = await customerRepositry.delete(req.params.id);
    res.send(results);
  } catch (error) {
    next(error);
  }
};
