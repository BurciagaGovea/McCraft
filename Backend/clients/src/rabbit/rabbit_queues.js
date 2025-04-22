import { get_rabbit_channel } from './connection_rabbit.js';

//esta madre es para ponderle un id al mensaje y ya no tener pedos 
//de que llegaron en desorden por que habia mas requests
import { v4 as id_r_message } from 'uuid';


//esta funcion va a mandar el mesaje para que se cree un usuario y que se espere el wey
export async function request_create_user(user_data) {


  
    //nos conectamos al canal de rabbit que hice en el otro archivo
  const channel = await get_rabbit_channel();


  const match_message_id = id_r_message();
  
    //creamos una queue temporal para este mensaje 
  const answer_to_queue = await channel.assertQueue('', { exclusive: true });



  return new Promise((resolve, reject) => {

    //nos ponemos a escuchar la queue
    channel.consume(answer_to_queue.queue, (rabbit_message) => {

        //si el id cuadra es el bueno
      if (rabbit_message.properties.correlationId !== match_message_id) return;

      const response = JSON.parse(rabbit_message.content.toString());

      //si llega un error al crear el usuario se cancela todo
      if (response.error) return reject(new Error(response.error));

      resolve(response);

    }, { noAck: true });


    // Ahora si mandamos el mensaje a la cola que el users escucha
    console.log("Waiting for an answer 0_0")

    channel.sendToQueue('create_user',

      Buffer.from(JSON.stringify(user_data)),
      {
        correlationId: match_message_id,           
        replyTo: answer_to_queue.queue,
        persistent: true
      }
    );
  });
}
