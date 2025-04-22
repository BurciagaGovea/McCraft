import express from 'express';
import { authenticate_token} from '../middleware/token_auth.js'


import { get_orders,
    get_order_by_id,
    get_order_details
 } from '../controllers/order_controllers.js';

const router = express.Router();

router.use(authenticate_token);

router.get('/', get_orders);
router.get('/:id', get_order_by_id);



//_______order_details

router.get('/details/:id', get_order_details)


export default router;