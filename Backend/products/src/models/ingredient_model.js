import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';


class Ingredient extends Model {}

Ingredient.init(

  {
    ingredient_id:{ 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },

    name:{ 
        type: DataTypes.STRING(40), 
        allowNull: false 
    },

    price:{ 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },

    image_url:{ 
        type: DataTypes.STRING, 
        allowNull: true 
    },

    stock:{ 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },

    is_active:{ 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }

  },
  { sequelize }
);

export default Ingredient;
