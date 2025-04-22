import CustomBurger from "../models/custom_model.js";
import CustomBurgerIngredient from "../models/associations/cutomB_ingredient.js"
import Ingredient from "../models/ingredient_model.js";


import sequelize from "../data_base/data_base_conection.js";


const custom_functions = {

    async get_custom_burgers ({limit = 40, offset= 0} = {} ){

        limit = +limit ||40
        offset = +offset || 0

        try {
            
            const custom_burguers = await CustomBurger.findAll({where: {is_active: true}, limit, offset});

            return custom_burguers;

        }catch(error){

            console.log("There was an error getting all the custom burguers ~_~")
            throw error;
        }
    },


    //___________________________________________________________


    async get_custom_burger_by_id (id){

        try{

            const custom_burguer = await CustomBurger.findOne({where: {custom_id: id, is_active: true}});

            if(!custom_burguer){

                throw new Error(`The custom burguer with id ${id} doesn't exist ~_~`);
            }

            return custom_burguer;
        }catch(error){

            console.log(`There was an error getting the custom burguer with id ${id} ~_~`);
            throw error;
        }

    },


    //_________________________________________________
    //esta tambien trae los ingredientes que incluye
    //con su relacion con ingredients
    async get_custom_full_by_id(id){

        try{

            const custom_burguer_full = await CustomBurger.findByPk(id,{

                include:[{
                    model: Ingredient,
                    as: 'ingredients',
                    through: {attributes: ['quantity']}
                }]
            });

            if(!custom_burguer_full){

                throw new Error(`The custom burguer with id ${id} doesn't exist ~_~`);
            }

            return custom_burguer_full;

        }catch(error){
            console.log(`There was an error getting the custom burguer with id ${id} ~_~`);
            throw error;

        }

    },

    //_____________________________________________________
    //esta madre calcula el precio de la hamburguesa segun el precio de cada ingrediente
    //algunos son gratis como la catsup etc, pero eso de declara en el modelo, se le pone precio de 0 y ya


    async create_custom({ client_id, name, ingredients }) {
        return sequelize.transaction(async (t) => {
          // 1) Consultar precios de ingredientes
          const ids = ingredients.map(i => i.ingredient_id);
          const dbIngredients = await Ingredient.findAll({
            where: { ingredient_id: ids },
            transaction: t
          });
          // 2) Calcular total
          let total_price = 0;
          const rows = ingredients.map(i => {
            const ing = dbIngredients.find(d => d.ingredient_id === i.ingredient_id);
            const qty = i.quantity ?? 1;
            const price = ing ? parseFloat(ing.price) : 0;
            total_price += price * qty;
            return {
              custom_id: null, // se asignará luego
              ingredient_id: i.ingredient_id,
              quantity: qty
            };
          });
          // 3) Crear registro padre con precio calculado
          const custom = await CustomBurger.create(
            { client_id, name, total_price },
            { transaction: t }
          );
          // 4) Asignar custom_id a filas y crear ingredientes
          rows.forEach(r => { r.custom_id = custom.custom_id; });
          await CustomBurgerIngredient.bulkCreate(rows, { transaction: t });
          return { custom: custom.get({ plain: true }), ingredients: rows };
        });
      },


      //_____________________________________________________

      async update_custom(id, { name, ingredients, is_active }) {
        return sequelize.transaction(async (t) => {
            const custom = await CustomBurger.findByPk(id, { transaction: t });
            if (!custom) throw new Error(`Custom burger ${id} not found`);
            // actualizar campos
            custom.name = name ?? custom.name;
            if (typeof is_active === 'boolean') {
                custom.is_active = is_active;
            }
            // si hay ingredientes nuevos, recalcular precio y reemplazar relación
            if (Array.isArray(ingredients)) {
                const ids = ingredients.map(i => i.ingredient_id);
                const dbIng = await Ingredient.findAll({ where: { ingredient_id: ids }, transaction: t });
                let total_price = 0;
                const rows = ingredients.map(i => {
                    const ing = dbIng.find(d => d.ingredient_id === i.ingredient_id);
                    const qty = i.quantity ?? 1;
                    total_price += (ing ? parseFloat(ing.price) : 0) * qty;
                    return { custom_id: id, ingredient_id: i.ingredient_id, quantity: qty };
                });
                custom.total_price = total_price;
                await custom.save({ transaction: t });
                await CustomBurgerIngredient.destroy({ where: { custom_id: id }, transaction: t });
                await CustomBurgerIngredient.bulkCreate(rows, { transaction: t });
            } else {
                await custom.save({ transaction: t });
            }
            return await CustomBurger.findByPk(id, {
                include: [{ model: Ingredient, as: 'ingredients', through: { attributes: ['quantity'] } }],
                transaction: t
            });
        });
    },

      //___________________________________________________añadir solo 1 a uno que ya existe_____

      // añade tras delete_custom:
  /**
   * Añade (o suma) un ingrediente a una custom burger existente
   * @param {number} customId
   * @param {{ ingredient_id: number, quantity?: number }} data
   */
  async add_ingredient_to_custom(customId, { ingredient_id, quantity = 1 }) {
    return sequelize.transaction(async (t) => {
      // 1) Buscar relación si ya existe
      let rel = await CustomBurgerIngredient.findOne({
        where: { custom_id: customId, ingredient_id },
        transaction: t
      });
      if (rel) {
        rel.quantity += quantity;
        await rel.save({ transaction: t });
      } else {
        rel = await CustomBurgerIngredient.create(
          { custom_id: customId, ingredient_id, quantity },
          { transaction: t }
        );
      }

      // 2) Recalcular total_price de la burger
      const rows = await CustomBurgerIngredient.findAll({
        where: { custom_id: customId },
        transaction: t
      });
      const ids = rows.map(r => r.ingredient_id);
      const dbIngredients = await Ingredient.findAll({
        where: { ingredient_id: ids },
        transaction: t
      });
      let total_price = 0;
      rows.forEach(r => {
        const ing = dbIngredients.find(d => d.ingredient_id === r.ingredient_id);
        total_price += (ing ? parseFloat(ing.price) : 0) * r.quantity;
      });
      const custom = await CustomBurger.findByPk(customId, { transaction: t });
      custom.total_price = total_price;
      await custom.save({ transaction: t });

      // 3) Devolver la burger completa con ingredientes
      return await CustomBurger.findByPk(customId, {
        include: [{ model: Ingredient, as: 'ingredients', through: { attributes: ['quantity'] } }],
        transaction: t
      });
    });
  },


      //_____________________________________________________________________
      async delete_custom(id) {
        try {
          const custom = await CustomBurger.findByPk(id);
          if (!custom) throw new Error(`Custom burger ${id} not found`);
          custom.is_active = false;
          await custom.save();
          return custom;
        } catch (err) {
          console.error(`Error deleting custom burger ${id}`, err);
          throw err;
        }
      },

      //__________________________________________________________________

      /**
 * Elimina un ingrediente de una custom burger y recalcula total_price
 * @param {number} customId
 * @param {number} ingredientId
 */
async remove_ingredient_from_custom(customId, ingredientId) {
    return sequelize.transaction(async (t) => {
      // 1) Buscar la relación
      const rel = await CustomBurgerIngredient.findOne({
        where: { custom_id: customId, ingredient_id: ingredientId },
        transaction: t
      });
      if (!rel) {
        throw new Error(`No existe la relación custom ${customId} ↔ ingredient ${ingredientId}`);
      }
      // 2) Eliminarla
      await rel.destroy({ transaction: t });
  
      // 3) Recalcular total_price con los ingredientes que queden
      const rows = await CustomBurgerIngredient.findAll({
        where: { custom_id: customId },
        transaction: t
      });
      const ids = rows.map(r => r.ingredient_id);
      const dbIng = await Ingredient.findAll({
        where: { ingredient_id: ids },
        transaction: t
      });
      let total_price = 0;
      rows.forEach(r => {
        const ing = dbIng.find(d => d.ingredient_id === r.ingredient_id);
        total_price += (ing ? parseFloat(ing.price) : 0) * r.quantity;
      });
  
      // 4) Actualizar el registro padre
      const custom = await CustomBurger.findByPk(customId, { transaction: t });
      custom.total_price = total_price;
      await custom.save({ transaction: t });
  
      // 5) Devolver la custom burger completa
      return await CustomBurger.findByPk(customId, {
        include: [{ model: Ingredient, as: 'ingredients', through: { attributes: ['quantity'] } }],
        transaction: t
      });
    });
  }
  


};

export default custom_functions;


