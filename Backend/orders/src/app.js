import express from 'express';
import router from './routes/routes_orders.js';
import { errorHandler } from './middleware/error_handler.js';



const app = express();

// to change http to json, we dont need body parser anymore, express does it alone
app.use(express.json());


app.use('/api/orders', router);


app.use(errorHandler);


export default app;