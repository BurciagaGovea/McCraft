import { DataTypes, Model } from 'sequelize';
import sequelize from '../../data_base/data_base_conection.js';
import Product from '../product_model.js';
import Ingredient from '../ingredient_model.js';
class ProductIngredient extends Model {}

ProductIngredient.init(
  {
    quantity: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 1 } 
  },
  { sequelize, modelName: 'ProductIngredient' }
);



export default ProductIngredient;
