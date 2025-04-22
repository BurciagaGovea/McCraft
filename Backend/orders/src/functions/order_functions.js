import Order from '../models/order_model.js';
import OrderDetail from '../models/order_details_model.js';
import OrderExtra from '../models/order_extras._model.js';

const order_functions = {
  // Obtener todos los pedidos con sus detalles y extras
  async get_orders() {
    try {
      return await Order.findAll({
        include: [{
          model: OrderDetail,
          as: 'details',
          include: [{ model: OrderExtra, as: 'extras' }]
        }]
      });
    } catch (error) {
      console.error('Error getting orders ~_~', error);
      throw error;
    }
  },

  // Obtener un pedido por ID (con sus detalles y extras)
  async get_order_by_id(order_id) {
    try {
      const order = await Order.findByPk(order_id, {
        include: [{
          model: OrderDetail,
          as: 'details',
          include: [{ model: OrderExtra, as: 'extras' }]
        }]
      });
      if (!order) {
        throw new Error(`Order with id ${order_id} does not exist ~_~`);
      }
      return order;
    } catch (error) {
      console.error(`Error getting order ${order_id}: ~_~`, error);
      throw error;
    }
  },

  // Obtener sólo los detalles de un pedido (sin la cabecera)
  async get_order_details_by_order(order_id) {
    try {
      return await OrderDetail.findAll({
        where: { order_id },
        include: [{ model: OrderExtra, as: 'extras' }]
      });
    } catch (error) {
      console.error(`Error getting details for order ${order_id} ~_~`, error);
      throw error;
    }
  }
};

export default order_functions;
