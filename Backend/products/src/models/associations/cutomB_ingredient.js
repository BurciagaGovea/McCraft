import { DataTypes, Model } from 'sequelize';
import sequelize from '../../data_base/data_base_conection.js';
import CustomBurger from '../custom_model.js'
import Ingredient from '../ingredient_model.js'




class CustomBurgerIngredient extends Model {}



CustomBurgerIngredient.init(

  {
    quantity: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 1 }
  },
  { sequelize, modelName: 'CustomBurgerIngredient' }
);



CustomBurger.belongsToMany(Ingredient, { through: CustomBurgerIngredient, foreignKey: 'custom_id' });
Ingredient.belongsToMany(CustomBurger, { through: CustomBurgerIngredient, foreignKey: 'ingredient_id' });



export default CustomBurgerIngredient;
