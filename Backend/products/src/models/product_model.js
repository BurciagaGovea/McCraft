import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';



class Product extends Model {}

Product.init(
    
  {
    product_id:{ 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },

    name: { 
      type: DataTypes.STRING(60), 
      allowNull: false 
    },

    description:
    { 
      type: DataTypes.TEXT,       
      allowNull: true  
    },

    base_price:{ 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false 
    },

    is_composite: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 

    },

    category:{ 
      type: DataTypes.ENUM('burger','side','drink','dessert'), 
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
  { sequelize}
);

export default Product;
