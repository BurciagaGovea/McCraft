import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';

class CustomBurger extends Model {}

CustomBurger.init(
  {
    custom_id:{ 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },

    client_id:  { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    }, 

    name: { 
        type: DataTypes.STRING(60), 
        allowNull: true 
    },

    total_price:{ 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },

    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
  },
  { sequelize}
);

export default CustomBurger;
