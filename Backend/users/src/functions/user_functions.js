import User from "../models/model_user.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';

dotenv.config();


const login_key= process.env.SECRET_KEY_LOGIN

//_________________________________


const user_functions= {


//Para que cuando haya muchos registros no truene 
//pero es mas como paginacion si puedes seguir obteniendo los que quieras
//Cuando hagas el request ahi mismo le metes la cantidad
    async get_users({ limit = 40, offset = 0}  = {} ) {

        limit = parseInt(limit);
        offset = parseInt(offset);

        try{

            const users = await User.findAll({attributes:
                                                {exclude: ['password']},
                                                limit,
                                                offset,
                                            });
            return users;

        }catch(error){

            console.log("There was an error getting the users ~_~ try again");
            //Esto es para que se siga pasando a las siguientes funciones el error
            throw error;
        
        }
    },

    //_______________________________________________________________________



    async getUserById(id, fields = null) {

        try{

            let attributes;

            if (fields) {
              attributes = fields
                .split(',')
                .map((f) => f.trim())
                .filter(Boolean);
    
              attributes = attributes.filter((f) => f.toLowerCase() !== 'password');

            } else {

              attributes = { exclude: ['password'] };
            }
          
    
            const user = await User.findByPk(id, { attributes });
          
            if (!user) {
              throw new Error(`User ${id} doesn't exist ~_~`);
            }
          
            return user;


        }catch(error){

            console.log(`There was an error getting the user: ${id} ~_~ try again`);
          
            throw error;

        }

      },

      //____________________________________________________________________________

      async create_user(user){

        try{

            const user_exist = await User.findOne( {where: {email: user.email}})

            if (user_exist){
                throw new Error(`The user ${user.email} already exists ~_~`)
            }

            const encrypt_password = await bcrypt.hash(user.password, 10);

            const new_user = await User.create({...user, password: encrypt_password})

            return new_user;

        }catch(error){

            console.log("There was an error crearing the user ~_~")
            throw error

        }

      },
      


    //_____________________________________________________--

    async update_user(id, user_data){

      try{

        const user = await User.findByPk(id);

        if (!user){

          throw new Error(`The user with id : ${id} doesn't exist ~_~`);
        }

        user.name = user_data.name  ?? user.name;
        user.last_name = user_data.last_name ?? user.last_name;
        user.email = user_data.email ?? user.email;



        if(user_data.password){

          if(user_data.password.length < 8 ){
            throw new Error("Password must be at leats 8 characters ~_~");
          }

          const encrypt_password = await bcrypt.hash(user_data.password, 10);
          user.password = encrypt_password 

        }else{
          user.password = user.password
        }



        user.image_url = user_data.image_url ?? user.image_url;

        user.role = user_data.role ?? user.role

        user.is_active = user_data.is_active ?? user.is_active




        await user.save();
        return user

      }catch(error){
        console.log(`There was an error updating the user with id: ${id} ~_~`, error)
        throw error;


      }
    },


    //_________________________________________________________________________


    async delete_user(id){

      try{

        const user = await User.findByPk(id);

        if(!user){
          throw new Error(`User with id ${id} doesn't exist ~_~`);
        }

        user.is_active = false
        await user.save();

        return user;


      }catch(error){

        console.log(`There was ana error deleting the user ~_~`, error)
        throw error;
      }
    },


    //___________________________-Login_____________________________

    async login(login_data){

      const {email, password} = login_data;

      try{

        if(!email || !password){

          throw new Error(`There is no email or passowrd in the request`)
        }

        const login_user = await User.findOne({where: {email, is_active: true}})

        if(!login_user){
           throw new Error(`User with email ${email} doesn't exist ~_~`)
        }


        const match_password = await bcrypt.compare(password, login_user.password);

        if(!match_password){
          throw new Error("Incorrect password ~_~");
        }



        const token = jwt.sign({

        
          user_id: login_user.user_id,
          name: login_user.name,
          last_name: login_user.last_name,
          email: login_user.email, 
          role: login_user.role,
        },
        login_key,
        {expiresIn: '12h'}
        );

        return {token};

        }catch(error){
          console.log("There was an error login in ~_~", error);
          throw error;
        }

    },
}
export default user_functions;