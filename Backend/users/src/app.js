import express from 'express';
import router from './routes/routes_user.js';
import { errorHandler } from './middlewares/error_handler.js';



//middleware of global errors:

// middlewares/errorHandler.js



//we need app to use express methods and expor it to index

const app = express();

// to change http to json, we dont need body parser anymore, express does it alone
app.use(express.json());


app.use('/api/users', router);


app.use(errorHandler);


export default app;