import { Request, Response, NextFunction } from "express";
import { Order } from "../entity/Order.js";
import { HotelTable, TableState } from "../entity/Table.js";
import { Session } from "../entity/Session.js";
import { Products } from "../entity/Products.js";
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

const saveOrder = async (
  product: Product,
  session: Session,
): Promise<Order> => {
  const order = new Order();
  if (product.variation_id) {
    order.variation = product.variation_id;
  } else if (product.product_id) {
    order.product = product.product_id;
  }
  order.quantity = product.quantity;
  order.status = "pending";
  order.note = product.note;
  order.session = session.id;
  await order.save();

  return order;
};

const createSession = async (table: HotelTable): Promise<Session> => {
  const session = new Session();
  session.hotel_table = table.id;
  session.bill_amount = 0;
  session.payment_status = "not_paid";
  await session.save();

  table.session = [session];
  await table.save();

  return session;
};

const calculateTotalCost = async (orders: Order[]): Promise<number> => {
  let totalCost = 0;
  for (const order of orders) {
    let price = 0;
    if (order.variation) {
      const variation = await Variations.findOneBy({ id: order.variation });
      price = variation?.price || 0;
    } else if (order.product) {
      const product = await Products.findOneBy({ id: order.product });
      price = product?.base_price || 0;
    }
    totalCost = totalCost + price * order.quantity;
  }

  return totalCost;
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.find({
      relations: ["session", "variation"],
    });
    if (!orders.length) {
      return res.json({ error: "Orders not found" });
    }
    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { table_id, products } = req.body as OrderBody;
    const table = await HotelTable.findOne({
      where: {
        id: table_id,
      },
      // relations: ["session"],
      relations: {
        session: true,
      },
    });
    console.log("table", table);

    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    // if table is vacant change status to occupied
    if (table.state === TableState.VACANT) {
      table.state = TableState.OCCUPIED;
    }

    let session: Session | null;
    let orders: Order[] = [];

    // create session if table doesn't have any session
    if (!table.session?.length) {
      session = await createSession(table);
    } else {
      session = await Session.findOne({
        where: {
          hotel_table: table_id,
        },
      });
    }

    if (!session) {
      return res.status(404).json({ error: "Session not found for the table" });
    }

    for (const product of products) {
      const order = await saveOrder(product, session);
      orders.push(order);
    }

    const totalCost = await calculateTotalCost(orders);

    session.bill_amount = totalCost;
    await session.save();
    await table.save();

    const tableCopy = { ...table };
    delete tableCopy.session;

    return res.json({
      success: true,
      message: "Order placed successfully",
      data: { table: tableCopy, session },
    });
  } catch (error) {
    next(error);
  }
};
