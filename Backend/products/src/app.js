import express from 'express';
import router from './routes/routes_product.js';
import { errorHandler } from './middlewares/error_handler.js';



const app = express();

// to change http to json, we dont need body parser anymore, express does it alone
app.use(express.json());


app.use('/api/products', router);


app.use(errorHandler);


export default app;