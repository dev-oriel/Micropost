const amqp = require("amqplib");
const { RABBITMQ_URL, TASK_QUEUE } = require("./config");

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL); // Uses updated config
    const channel = await connection.createChannel();

    await channel.assertQueue(TASK_QUEUE, { durable: true });

    console.log(`Waiting for messages in queue '${TASK_QUEUE}'...`);
    channel.consume(
      TASK_QUEUE,
      (msg) => {
        if (msg !== null) {
          console.log(`Received message: ${msg.content.toString()}`);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error in startConsumer:", error);
  }
}

module.exports = { startConsumer };
