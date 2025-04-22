import Client from '../models/client_model.js'
import Address from '../models/address_model.js';
import sequelize from '../data_base/data_base_conection.js';


import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

//_________________________________


const address_functions= {

    async get_addresses(){

        try{

            const addresses = await Address.findAll();

            return addresses;
        }catch(error){

            console.log(`There was an error getting the addresses ~_~ try again`)
            throw error;
        }

    },

    //__________________________________________________________

    async create_address(address_data){

        try{

            const address = await Address.create(address_data);
            return address;



        }catch(error){

            console.log('There was an error creating the address ~_~', error);
            throw error;
        }
    
    },

    //______________________________________________________________________________

    async update_address(id, address_data){

        try{

            const address = await Address.findByPk(id);

            if(!address){
                throw new Error(`The address with id ${id} doesn't exist ~_~`);
            }

            address.street = address_data.street ?? address.street;
            address.zone = address_data.zone ?? address.zone;
            address.city = address_data.city ?? address.city;
            address.state= address_data.state ?? address.state;
            address.zip_code = address_data.zip_code ?? address.zip_code;

            address.label = address_data.label ?? address.label;

            address.is_default = address_data.is_default ?? address.is_default;


            await address.save();
            return address;



        }catch(error){

            console.log("There was an error updating the address ~_~", error)
            throw error;
        }

    },


    //______________________________________________________________________

    async delete_address (id){

        try{

            const address = await Address.findByPk(id);

            if(!address){

                throw new Error(`The address with id: ${id} doesn't exist ~_~`);
            }

            address.is_active = false
            await address.save();
            

            return address;



        }catch(error){

            console.log('There was an error deleting the address ~_~', error)
            throw error;
        }
    }

}

//______________________________________



export default address_functions;