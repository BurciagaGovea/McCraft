import ProductIngredient from "../../models/associations/product_ingredient.js";


const product_ingredients_functions = {
  // Listar todos los enlaces producto↔ingrediente
  async list_all() {
    return await ProductIngredient.findAll();
  },

  // Listar la receta de un producto
  async list_by_product(product_id) {
    return await ProductIngredient.findAll({ where: { product_id } });
  },

  // Añadir un ingrediente a un producto
  async add({ product_id, ingredient_id, quantity }) {
    return await ProductIngredient.create({ product_id, ingredient_id, quantity });
  },

  // Actualizar la cantidad de un ingrediente en un producto
  async update(product_id, ingredient_id, quantity) {
    const row = await ProductIngredient.findOne({ where: { product_id, ingredient_id } });
    if (!row) throw new Error(`No existe la relación product_id=${product_id}, ingredient_id=${ingredient_id}`);
    row.quantity = quantity;
    return await row.save();
  },

  // Eliminar un ingrediente de la receta
  async remove(product_id, ingredient_id) {
    const deleted = await ProductIngredient.destroy({ where: { product_id, ingredient_id } });
    if (!deleted) throw new Error(`No existe la relación product_id=${product_id}, ingredient_id=${ingredient_id}`);
    return { product_id, ingredient_id };
  }
};

export default product_ingredients_functions;
