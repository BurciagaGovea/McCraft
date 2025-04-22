import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';

class OrderDetail extends Model {}

OrderDetail.init(
  {
    order_detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    combo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    custom_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_type: {
      type: DataTypes.ENUM('PRODUCT','COMBO','CUSTOM_BURGER'),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    line_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'OrderDetail',
    validate: {
      oneItemType() {
        const count = [this.product_id, this.combo_id, this.custom_id]
          .filter(v => v != null).length;
        if (count !== 1) {
          throw new Error(
            'Debe tener exactamente uno de product_id, combo_id o custom_id'
          );
        }
      }
    }
  }
);

export default OrderDetail;
