import order_functions from "../functions/order_functions.js";


export const get_orders = async (req, res, next) => {
  try {
    const orders = await order_functions.get_orders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const get_order_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await order_functions.get_order_by_id(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const get_order_details = async (req, res, next) => {
  try {
    const { id: order_id } = req.params;
    const details = await order_functions.get_order_details_by_order(order_id);
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
};
