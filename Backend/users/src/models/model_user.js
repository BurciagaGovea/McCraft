import { DataTypes, Model } from "sequelize";
import sequelize from "../data_base/data_base_conection.js";


//https://sequelize.org/docs/v6/core-concepts/model-basics/


//_______note: created at and updated at are enabled by default______
//____you can removet with timestmaps:false

class User extends Model {
//__Here que can add methods to take advantage of the clases____

    get_full_name(){
        return [this.name, this.last_name].join(' ');
    }

}

User.init(

    {
        user_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },

        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[1,15]
            }
        },

        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[1,20]
            }
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[8,200]
            }
        },

        image_url:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        role: {
            type: DataTypes.ENUM('client','chef','admin'),
            allowNull: false,
            defaultValue: 'client'    // ← DEFAULT
        },

        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    },
        //_____We must add the conection with sequelize_______
    { sequelize },

    
);

export default User;