const amqp = require("amqplib");
const { RABBITMQ_URL, TASK_QUEUE } = require("./config");

async function sendMessage(message) {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Assert the queue exists
    await channel.assertQueue(TASK_QUEUE, { durable: true });

    // Send the message to the queue
    channel.sendToQueue(TASK_QUEUE, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue '${TASK_QUEUE}':`, message);

    // Close the connection after a short delay
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in sendMessage:", error);
  }
}

module.exports = { sendMessage };
