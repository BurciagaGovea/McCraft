
import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';

class Client extends Model {}

Client.init(
  {
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true         
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  { sequelize }
);

export default Client;
