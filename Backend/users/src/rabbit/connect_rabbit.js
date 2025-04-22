// queues/rabbit.js
import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config()

const rabbit_url=process.env.RABBIT_URL

const exchange_name = 'clients';
const exchange_type = 'direct';
const exchange_details = {durable: true};

let connection;
let channel;


//es para la connexion a rabbit
export async function get_rabbit_channel() {

  if (channel) return channel;

  connection = await amqp.connect(rabbit_url);
  channel = await connection.createChannel();

  //creamos el exchange de clients
  //durable true para que persistan los mensajes, ahunque por defecto ya viene en true
  //crea un exchange o si ya existe lo usa
  await channel.assertExchange(exchange_name, exchange_type, exchange_details);

  console.log(`${exchange_name} in mode ${exchange_type} running 0_0`)


  return channel;
}
