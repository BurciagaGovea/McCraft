import { DataTypes, Model } from 'sequelize';
import sequelize from '../../data_base/data_base_conection.js';
import Combo from '../combo_model.js'
import Product from '../product_model.js';

class ComboProduct extends Model {}

ComboProduct.init(
  
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  },
  { sequelize, modelName: 'ComboProduct' }
  
);


export default ComboProduct;
