import dotenv from 'dotenv';



dotenv.config();
const port = process.env.PORT;

import app from './src/app.js';
import './src/models/index.js';   



app.listen(port, () => {
    console.log(`products service is running on port: ${port} 0_0`)
});

