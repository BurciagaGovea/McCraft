import dotenv from 'dotenv';

import app from './src/app.js';

dotenv.config();
const port = process.env.PORT;


//Here we just add app so the routes run in the specified port

app.listen(port, () => {
    console.log(`clients service is running on port: ${port} 0_0`)
});

