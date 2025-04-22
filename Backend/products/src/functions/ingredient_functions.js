
import Ingredient from "../models/ingredient_model.js";

import dotenv from 'dotenv'


const ingredient_functions= {

    async get_ingredients(){

        try{

            const ingredients = await Ingredient.findAll();
            return ingredients;

        }catch(error){

            console.log("There was an error getting the ingredients ~_~")
            throw error;
        }
    },

    //_____________________________________________________________________


    async get_ingredient_by_id(id) {

        try{

    
            const ingredient = await Ingredient.findByPk(id);
          
            if (!ingredient) {
              throw new Error(`Ingredient with id: ${id} doesn't exist ~_~`);
            }
          
            return ingredient;


        }catch(error){

            console.log(`There was an error getting the ingredient: ${id} ~_~ try again`);
          
            throw error;

        }

      },


      //___________________________________________________________________


      async create_ingredient(ingredient_data){

        try{

            const ingredient_exist = await Ingredient.findOne( {where: {name: ingredient_data.name}})

            if (ingredient_exist){
                throw new Error(`The ingredient ${ingredient_data.name} already exists ~_~`)
            }


            const new_ingredient = await Ingredient.create(ingredient_data);

            return new_ingredient;

        }catch(error){

            console.log("There was an error crearing the ingredient ~_~")
            throw error

        }

      },
      
      //_________________________________________________________________________

      async update_ingredient(id,ingredient_data){

        try{

            const ingredient =await Ingredient.findByPk(id);

            if(!ingredient){
                throw new Error(`The ingredient with the id ${id} doesnt exists ~_~`);
            }

            ingredient.name = ingredient_data.name ?? ingredient.name;
            ingredient.price = ingredient_data.price ?? ingredient.price;
            ingredient.image_url = ingredient_data.image_url ?? ingredient.image_url;
            ingredient.stock = ingredient_data.stock ?? ingredient.stock;
            ingredient.is_active = ingredient_data.is_active ?? ingredient.is_active;

            await ingredient.save();
            return ingredient

        }catch(error){
            console.log(`There was an error updating the ingredient: ${id} ~_~`, error)
            throw error;
        }
      },

      async delete_ingredient(id){

        try{

            const ingredient = await Ingredient.findByPk(id);

            if(!ingredient){
                throw new Error(`The ingredient with id: ${id} doesnt'exists ~_~`)
            }

            ingredient.is_active = false;

            ingredient.save();
            return ingredient;
        }catch(error){

            console.log(`there was an error deleting ingredient with id ${id} ~_~`)
            throw error;
        }
      }

}

export default ingredient_functions;