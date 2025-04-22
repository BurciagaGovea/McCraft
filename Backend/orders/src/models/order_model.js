import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';

class Order extends Model {
  // Calcula el total sumando detalles y extras
  async calculateTotal() {
    const details = await this.getDetails({ include: ['extras'] });
    return details.reduce((sum, d) => {
      const extrasCost = d.extras.reduce(
        (eSum, e) => eSum + Number(e.extra_cost) * e.quantity,
        0
      );
      return sum + Number(d.line_price) * d.quantity + extrasCost;
    }, 0).toFixed(2);
  }
}

Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING','PAID','IN_PROGRESS','READY','CANCELED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    payment_method: {
      type: DataTypes.ENUM('CARD','CASH','WALLET'),
      allowNull: true
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    canceledAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Order'
  }
);

// Hook: cuando cambia a PAID o CANCELED, fija fechas y total
Order.beforeUpdate(async order => {
  if (order.changed('status')) {
    if (order.status === 'PAID') {
      order.paidAt = new Date();
      order.total_amount = await order.calculateTotal();
    }
    if (order.status === 'CANCELED') {
      order.canceledAt = new Date();
    }
  }
});

export default Order;
