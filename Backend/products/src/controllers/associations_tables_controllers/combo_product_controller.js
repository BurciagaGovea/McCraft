import comboProductFunctions from "../../functions/relation_tables_functions/combo_product_function.js";

export const list_all_combos = async (req, res, next) => {
  try {
    const result = await comboProductFunctions.list_all_combos(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const list_by_combo = async (req, res, next) => {
  try {
    const { comboId } = req.params;
    const result = await comboProductFunctions.list_by_combo(comboId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const add_product = async (req, res, next) => {
  try {
    const { comboId } = req.params;
    const data = req.body; // { product_id, quantity? }
    const result = await comboProductFunctions.add_product(comboId, data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const update_quantity = async (req, res, next) => {
  try {
    const { comboId, productId } = req.params;
    const data = req.body; // { quantity }
    const result = await comboProductFunctions.update_quantity(
      comboId,
      productId,
      data
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const remove_product = async (req, res, next) => {
  try {
    const { comboId, productId } = req.params;
    const result = await comboProductFunctions.remove_product(comboId, productId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
