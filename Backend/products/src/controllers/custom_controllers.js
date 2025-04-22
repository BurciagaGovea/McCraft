import custom_functions from '../functions/custom_functions.js';

// Controladores para CustomBurger

export const get_custom_burgers = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const burgers = await custom_functions.get_custom_burgers({ limit, offset });
    res.status(200).json(burgers);
  } catch (err) {
    next(err);
  }
};

export const get_custom_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const burger = await custom_functions.get_custom_burger_by_id(id);
    res.status(200).json(burger);
  } catch (err) {
    next(err);
  }
};

export const get_custom_full = async (req, res, next) => {
  try {
    const { id } = req.params;
    const burger = await custom_functions.get_custom_full_by_id(id);
    res.status(200).json(burger);
  } catch (err) {
    next(err);
  }
};

export const create_custom = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await custom_functions.create_custom(payload);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const update_custom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await custom_functions.update_custom(id, payload);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};


export const add_custom_ingredient = async (req, res, next) => {
    try {
      const { id } = req.params;
      // espera { ingredient_id, quantity } en el body
      const updated = await custom_functions.add_ingredient_to_custom(id, req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };
  

export const delete_custom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await custom_functions.delete_custom(id);
    res.status(200).json(removed);
  } catch (err) {
    next(err);
  }
};


export const remove_custom_ingredient = async (req, res, next) => {
    try {
      const { id, ingredientId } = req.params;
      const updated = await custom_functions.remove_ingredient_from_custom(id, Number(ingredientId));
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };
  
