// users/consumers/createUser.consumer.js
import amqp from 'amqplib';
import dotenv from 'dotenv';
import user_functions from '../functions/user_functions.js'

dotenv.config();

const rabbit_url = process.env.RABBIT_URL;




(async () => {


  const connection = await amqp.connect(rabbit_url);
  const channel = await connection.createChannel();

//esto ve si la queue existe o no
  await channel.assertQueue('create_user', { durable: true });



  console.log('Users is listening to clients 0_0');


//revisamos los mensajes del jodido rabbit
  channel.consume('create_user', async (rabbit_message) => {

    try {

      const data = JSON.parse(rabbit_message.content.toString());


//esta es la funcion con la que se crean los usuarios se usa asi normal
//clients mando el mensaje con todos los datos asi que los sacamos con dara pero antes los parseamos
      const new_user = await user_functions.create_user(data);

      const response = JSON.stringify({ user_id: new_user.user_id });


      //tenemos que regresar una respuesta ya que clients se queda esperando
      //tenemos que mandarle de regreso el id del mensaje para que sepa que pedo
      //como ya viene en propiedades aqui no creamos otro solo se regresa el que creo clients
      channel.sendToQueue(

        rabbit_message.properties.replyTo,
        Buffer.from(response),
        { correlationId: rabbit_message.properties.correlationId }

      );
      
      //con esto le confirmamos a rabbit que ya estuvo
      channel.ack(rabbit_message);


    } catch (error) {

      console.log('There was an error creating the user with rabbit ~_~', error);

      const error_response = JSON.stringify({ error: error.message });

      channel.sendToQueue(

        rabbit_message.properties.replyTo,
        Buffer.from(error_response),
        { correlationId: rabbit_message.properties.correlationId }

      );

      //igual si hay fallo le avisamos que hubo pedo y que le pare
      channel.ack(rabbit_message); 
    }
  });
})();
