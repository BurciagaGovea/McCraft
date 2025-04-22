import combo_functions from '../functions/combo_functions.js';
import Product from '../models/product_model.js';
import ComboProduct from '../models/associations/combo_product.js';


export const get_combos = async (req, res, next) => {
  try {
    const combos = await combo_functions.get_combos(req.query);
    res.json(combos);
  } catch (err) {
    next(err);
  }
};

export const get_combo_by_id = async (req, res, next) => {
  try {
    const combo = await combo_functions.get_combo_by_id(req.params.id);
    res.json(combo);
  } catch (err) {
    next(err);
  }
};


//_____________________________________________
export const get_combo_full = async (req, res, next) => {
  try {
    const combo = await combo_functions.get_combo_full(req.params.id);
    res.json(combo);
  } catch (err) {
    next(err);
  }
};


export const create_combo = async (req, res, next) => {
  try {
    const combo = await combo_functions.create_combo(req.body);
    res.status(201).json(combo);
  } catch (err) {
    next(err);
  }
};

export const update_combo = async (req, res, next) => {
  try {
    const combo = await combo_functions.update_combo(req.params.id, req.body);
    res.json(combo);
  } catch (err) {
    next(err);
  }
};

export const delete_combo = async (req, res, next) => {
  try {
    const combo = await combo_functions.delete_combo(req.params.id);
    res.json(combo);
  } catch (err) {
    next(err);
  }
};
