import address_functions from '../functions/address_functions.js'

export const get_addresses = async (req, res, next) =>{

    try{

        const addresses = await address_functions.get_addresses();

        res.status(200).json(addresses);


    }catch(error){
        next(error)
    }
}


//_______________________________________________________-


export const create_address = async (req, res, next) =>{


    try{

        const address_data = req.body

        const address = await address_functions.create_address(address_data);

        return res.status(200).json(address);

    }catch(error){

        next(error)
    }
}


//___________________________________________________________


export const update_address = async(req, res, next)=>{

    try{

        const {id} = req.params;
        const address_data = req.body;


        const update= await address_functions.update_address(id,address_data)
        res.status(200).json(update);

    }catch(error){
        next(error);
    }
}

//_________________________________________________________________

export const delete_address = async(req, res, next) => {

    try{

        const {id} = req.params;
        

        const deactivate = await address_functions.delete_address(id);
        res.status(200).json(deactivate);

    }catch(error){

        next(error);
    }
}