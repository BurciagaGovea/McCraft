import express from 'express';
import { authenticate_token } from '../middlewares/token_auth.js';


import { get_client_by_id, get_clients } from '../controllers/controllers_clients.js';
import { get_addresses, delete_address, update_address, create_address } from '../controllers/controllers_address.js';
import { create_client, delete_client, update_client } from '../controllers/controllers_clients.js';



const router = express.Router();

//pordia proteger todas con router.use(authenticate_token) pero mejor solo algunas por si acaso

//_____________________________Clients ___________________________


router.get('/', authenticate_token, get_clients );
router.get('/client/:id', authenticate_token,  get_client_by_id);

//esta no la protegi por que si te estas creando la cuenta ps no va a estar logeado
router.post('/create',create_client);

router.put('/update/:id', authenticate_token, update_client);
router.delete('/delete/:id', authenticate_token, delete_client);


//_____________________________Addresses ___________________________

router.get('/addresses', get_addresses);

router.post('/address/create', create_address);
router.put('/address/update/:id',update_address);
router.delete('/address/delete/:id', delete_address);




export default router;
