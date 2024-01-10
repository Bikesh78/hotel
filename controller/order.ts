import { Request, Response, NextFunction } from "express";
import { Order } from "../entity/Order.js";
import { HotelTable, TableState } from "../entity/Table.js";
import { Variations } from "../entity/Variations.js";

interface Product {
  variation_id?: number;
  product_id?: number;
  quantity: number;
  note: string;
}

interface OrderBody {
  table_id: number;
  products: Product[];
}

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.json({ error: "Orders not found" });
    }
    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

export const postOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { table_id, products } = req.body as OrderBody;
    // const { product_id, variation_id, quantity, note } = products;
    // const order = new Order();
    // console.log("body", req.body);
    const table = await HotelTable.findOneBy({ id: table_id });

    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    if (table.state === "vacant") {
      table.state = TableState.OCCUPIED;
    }

    products.forEach(async (product) => {
      // console.log("product", product);
      const order = new Order();
      if (product.variation_id) {
        order.variation = product.variation_id;
      } else if (product.product_id) {
        order.product = product.product_id;
      }

      order.quantity = product.quantity;
      order.status = "pending";
      await order.save();
      console.log("order", order);
    });

    await table.save();

    return res.json({ table });
  } catch (error) {
    next(error);
  }
};

// export const deleteTable = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const id = Number(req.params.id);
//     const table = await HotelTable.findOneBy({ id: id });
//     if (!table) {
//       res.status(404).json("404 not found");
//     }
//
//     await table?.remove();
//
//     res.json({ message: `Deleted table ${id} succesfully` });
//   } catch (error) {
//     next(error);
//   }
// };
