import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

let channel;
const queueName = process.env.QUEUE_NAME;

export async function initializeRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log('RabbitMQ connection established');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    throw error;
  }
}

export async function publishMessage(content) {
  if (!channel) {
    throw new Error('RabbitMQ channel not initialized');
  }
  
  const message = Buffer.from(JSON.stringify({ content, timestamp: new Date() }));
  return channel.sendToQueue(queueName, message, { persistent: true });
}