import sequelize   from '../data_base/data_base_conection.js';
import Order       from './order_model.js';
import OrderDetail from './order_details_model.js';
import OrderExtra  from './order_extras._model.js';

// Order → OrderDetail (1:n)
Order.hasMany(OrderDetail,    { foreignKey: 'order_id',        as: 'details' });
OrderDetail.belongsTo(Order,  { foreignKey: 'order_id',        as: 'order'   });

// OrderDetail → OrderExtra (1:n)
OrderDetail.hasMany(OrderExtra,   { foreignKey: 'order_detail_id', as: 'extras'  });
OrderExtra.belongsTo(OrderDetail, { foreignKey: 'order_detail_id', as: 'detail' });

export {
  sequelize,
  Order,
  OrderDetail,
  OrderExtra
};
