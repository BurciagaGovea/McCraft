import product_ingredients_functions from "../../functions/relation_tables_functions/product_ingredients_functions.js";


export const list_all = async (req, res, next) => {
  try {
    const items = await product_ingredients_functions.list_all();
    res.json(items);
  } catch (err) { next(err) }
};

export const list_by_product = async (req, res, next) => {
  try {
    const { id: product_id } = req.params;
    const items = await product_ingredients_functions.list_by_product(product_id);
    res.json(items);
  } catch (err) { next(err) }
};

export const add_ingredient = async (req, res, next) => {
  try {
    const product_id = Number(req.params.id);
    const { ingredient_id, quantity } = req.body;
    const row = await product_ingredients_functions.add({ product_id, ingredient_id, quantity });
    res.status(201).json(row);
  } catch (err) { next(err) }
};

export const update_ingredient = async (req, res, next) => {
  try {
    const { id: product_id, ingredientId: ingredient_id } = req.params;
    const { quantity } = req.body;
    const row = await product_ingredients_functions.update(product_id, ingredient_id, quantity);
    res.json(row);
  } catch (err) { next(err) }
};

export const remove_ingredient = async (req, res, next) => {
  try {
    const { id: product_id, ingredientId: ingredient_id } = req.params;
    const result = await product_ingredients_functions.remove(product_id, ingredient_id);
    res.json(result);
  } catch (err) { next(err) }
};
