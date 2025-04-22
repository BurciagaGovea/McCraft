import ComboProduct from "../../models/associations/combo_product.js";


const comboProductFunctions = {
  // Listar todas las relaciones combo⇄product con paginación
  async list_all_combos({ limit = 40, offset = 0 } = {}) {
    limit  = +limit  || 40;
    offset = +offset || 0;
    try {
      return await ComboProduct.findAll({ limit, offset, raw: true });
    } catch (err) {
      console.error('Error getting combo_products', err);
      throw err;
    }
  },

  // Listar solo los productos de un combo
  async list_by_combo(comboId) {
    try {
      return await ComboProduct.findAll({
        where: { combo_id: comboId },
        raw: true
      });
    } catch (err) {
      console.error(`Error getting products for combo ${comboId}`, err);
      throw err;
    }
  },

  // Añadir un producto a un combo
  async add_product(comboId, { product_id, quantity = 1 }) {
    try {
      // opcional: podrías verificar si ya existe la fila y hacer update en lugar de insert
      return await ComboProduct.create({
        combo_id:   comboId,
        product_id,
        quantity
      });
    } catch (err) {
      console.error(`Error adding product ${product_id} to combo ${comboId}`, err);
      throw err;
    }
  },

  // Actualizar la cantidad de un producto en un combo
  async update_quantity(comboId, productId, { quantity }) {
    try {
      const rel = await ComboProduct.findOne({
        where: { combo_id: comboId, product_id: productId }
      });
      if (!rel) {
        throw new Error(`No relation combo ${comboId} ↔ product ${productId}`);
      }
      rel.quantity = quantity ?? rel.quantity;
      await rel.save();
      return rel;
    } catch (err) {
      console.error(
        `Error updating quantity for product ${productId} in combo ${comboId}`,
        err
      );
      throw err;
    }
  },

  // Eliminar un producto de un combo
  async remove_product(comboId, productId) {
    try {
      const rel = await ComboProduct.findOne({
        where: { combo_id: comboId, product_id: productId }
      });
      if (!rel) {
        throw new Error(`No relation combo ${comboId} ↔ product ${productId}`);
      }
      await rel.destroy();
      return rel;
    } catch (err) {
      console.error(
        `Error removing product ${productId} from combo ${comboId}`,
        err
      );
      throw err;
    }
  }
};

export default comboProductFunctions;
