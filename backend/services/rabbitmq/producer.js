const amqp = require("amqplib");
const { RABBITMQ_URL, TASK_QUEUE } = require("./config");

async function sendMessage(message) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL); // Uses updated config
    const channel = await connection.createChannel();

    await channel.assertQueue(TASK_QUEUE, { durable: true });

    channel.sendToQueue(TASK_QUEUE, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue '${TASK_QUEUE}':`, message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in sendMessage:", error);
  }
}

module.exports = { sendMessage };
