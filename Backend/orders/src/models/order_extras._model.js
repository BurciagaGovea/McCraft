import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';

class OrderExtra extends Model {}

OrderExtra.init(
  {
    order_extra_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    extra_cost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'OrderExtra'
  }
);

export default OrderExtra;
