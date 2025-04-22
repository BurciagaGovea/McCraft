// models/ProductSize.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../data_base/data_base_conection.js';
import Product from '../product_model.js';

class ProductSize extends Model {}

ProductSize.init(

  {

    size_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'product_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    size: {
      type: DataTypes.ENUM('small', 'medium', 'large'),
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  },
  { 
    sequelize,
    modelName: 'ProductSize'
  }
);



export default ProductSize;
