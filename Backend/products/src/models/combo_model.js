import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';


class Combo extends Model {}

Combo.init(
  {
    combo_id:{ 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },

    name:{ 
        type: DataTypes.STRING(60), 
        allowNull: false 
    },

    description:{ 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    price:{ 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },

    image_url:{ 
        type: DataTypes.STRING,
        allowNull: true 
    },

    is_active:{ 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
  },
  { sequelize }
);

export default Combo;
