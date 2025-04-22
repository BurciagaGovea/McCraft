import { request_create_user } from "../rabbit/rabbit_queues.js"; 
import client_functions from "./client_functions.js";


export async function create_client_with_user(data){

    const user = await request_create_user({
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role:'client',
    });

    const client = await client_functions.create_client({
        user_id: user.user_id,
        phone: data.phone
    });

    return { user_id: user.user_id, client};
}