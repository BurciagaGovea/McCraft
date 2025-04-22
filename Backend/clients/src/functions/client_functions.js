import Client from '../models/client_model.js'
import Address from '../models/address_model.js';
import sequelize from '../data_base/data_base_conection.js';

import { get_rabbit_channel } from '../rabbit/connection_rabbit.js';

import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

//_________________________________


const client_functions= {


//Para que cuando haya muchos registros no truene 
//pero es mas como paginacion si puedes seguir obteniendo los que quieras
//Cuando hagas el request ahi mismo le metes la cantidad
    async get_clients({ limit = 40, offset = 0}  = {} ) {

        limit = parseInt(limit);
        offset = parseInt(offset);

        try{

            const clients = await Client.findAll({limit,offset,});
            return clients;

        }catch(error){

            console.log("There was an error getting the clients ~_~ try again");
            //Esto es para que se siga pasando a las siguientes funciones el error
            throw error;
        
        }
    },

    //_______________________________________________________________________



    async get_client_ById(id) {

        try{

    
            const client = await Client.findByPk(id);
          
            if (!client) {
              throw new Error(`Client ${id} doesn't exist ~_~`);
            }
          
            return client;


        }catch(error){

            console.log(`There was an error getting the client: ${id} ~_~ try again`);
          
            throw error;

        }

      },

      //cuando creo un cliente se va a crear un usuario
//________________________________________________________________________________

      async create_client(client_data){

        try{

          const client = await Client.create(client_data);

          return client;

        }catch(error){


          console.log(`There was an error creating the client ~_~`, error);
          throw error;

        }

      },

      
    //_______________________________


    async update_client(id, client_data){


      try{

        const client = await Client.findByPk(id);

        if (!client){
          throw new Error(`Client with id:${id} doesn't exist ~_~`);
        }

        client.phone = client_data.phone ?? client.phone;
        client.is_active = client_data.is_active ?? client.is_active;

        await client.save();

        return client;

      }catch(error){

        console.log(`There was an error updating the client ~_~`, error)
        throw error;
      }

    },

    //___________________________________________

    async delete_client(id){

      try{

        const client = await Client.findByPk(id);

        if(!client){
          throw new Error(`Client with id ${id} doesn't exist ~_~`);
        }

        client.is_active = false
        await client.save();

        return client;


      }catch(error){

        console.log(`There was ana error deleting the client ~_~`, error)
        throw error;
      }
    }




}

export default client_functions;