import dotenv from 'dotenv';


dotenv.config();
const port = process.env.PORT;



import app from './src/app.js';
//es para que carguen las relaciones de los modelos cuando inicia express y no haya pedos
import './src/models/index.js'


//Here we just add app so the routes run in the specified port

app.listen(port, () => {
    console.log(`orders service is running on port: ${port} 0_0`)
});

