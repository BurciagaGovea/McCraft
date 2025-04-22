import ComboProduct from '../models/associations/combo_product.js';
import Product from '../models/product_model.js';
import Combo from '../models/combo_model.js';
import sequelize from '../data_base/data_base_conection.js';

const combo_functions = {
  // GET /api/combos?limit=40&offset=0



  async get_combos({ limit = 40, offset = 0 } = {}) {
    limit  = +limit  || 40;
    offset = +offset || 0;
    try {
      return await Combo.findAll({ limit, offset, raw: true });
    } catch (err) {
      console.error("Error getting combos ~_~", err);
      throw err;
    }
  },

  // GET /api/combos/:id 
  async get_combo_by_id(id) {
    try{

    
    const combo = await Combo.findByPk(id, { raw: true });
    if (!combo) throw new Error(`Combo ${id} not found`);
    return combo;
  
    } catch (err) {
      console.error(`Error getting combo with id:  ${id} ~_~`, err);
      throw err;
    }
  },

  //__________________________________________________
  async get_combo_full(id) {
    const combo = await Combo.findByPk(id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });

    if (!combo) {
      throw new Error(`Combo with id: ${id} not found ~_~`);
    }

    return combo;
  },

  // POST /api/combos
  // body: { productId, ingredientId, quantity? }
  async create_combo({ name, description, price, products }) {
    return sequelize.transaction(async (t) => {
      // 1) Crear el registro padre en Combos
      const combo = await Combo.create(
        { name, description, price },
        { transaction: t }
      );

      // 2) Preparar las líneas para ComboProducts
      const items = products.map(p => ({
        combo_id:   combo.combo_id,
        product_id: p.product_id,
        quantity:   p.quantity ?? 1
      }));

      // 3) Insertar todas las líneas en la tabla de unión
      await ComboProduct.bulkCreate(items, { transaction: t });

      // 4) Devolver algo útil
      return {
        combo: combo.get({ plain: true }),
        items
      };
    });
  },

  // PATCH /api/combos/:id
  // body: { quantity }
  async update_combo(id, data) {
    try {
      const combo = await ComboProduct.findByPk(id);
      if (!combo) throw new Error(`Combo ${id} not found ~_~`);
      combo.quantity = data.quantity ?? combo.quantity;
      await combo.save();
      return combo;
    } catch (err) {
      console.error(`Error updating combo ${id}`, err);
      throw err;
    }
  },

  // DELETE /api/combos/:id
  async delete_combo(id) {
    const combo = await Combo.findByPk(id);
    if (!combo) {
      throw new Error(`Combo ${id} not found ~_~`);
    }
    combo.is_active = false;
    await combo.save();
    return combo;
  }
};

export default combo_functions;
