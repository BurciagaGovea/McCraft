import ingredient_functions from "../functions/ingredient_functions.js"


export const get_ingredients = async(req,res,next) => {

    try{

        const ingredients = await ingredient_functions.get_ingredients();
        res.status(200).json(ingredients);

    }catch(error){
        next(error);
    }
}



//__________________________________________________________________-

export const get_ingredient_by_id = async(req,res,next) => {

    try{
        const {id} = req.params;
        

        const ingredients = await ingredient_functions.get_ingredient_by_id(id);
        res.status(200).json(ingredients);

    }catch(error){
        next(error);
    }
}
//______________________________________________________________

export const create_ingredient = async(req,res,next) => {

    try{
       
        const ingredient_data = req.body;

        const ingredients = await ingredient_functions.create_ingredient(ingredient_data);
        res.status(200).json(ingredients);

    }catch(error){
        next(error);
    }
}

//______________________________________________________________

export const update_ingredient_s = async(req,res,next) => {

    try{

        const {id} = req.params;
        const ingredient_data = req.body;

        const ingredients = await ingredient_functions.update_ingredient(id,ingredient_data);
        res.status(200).json(ingredients);

    }catch(error){
        next(error);
    }
}



//____________________________________________________________________

export const delete_ingredient = async(req,res,next) => {

    try{

        const {id} = req.params;

        const ingredients = await ingredient_functions.delete_ingredient(id);
        res.status(200).json(ingredients);

    }catch(error){
        next(error);
    }
}