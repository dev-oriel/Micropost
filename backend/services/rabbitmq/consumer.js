const amqp = require("amqplib");
const { RABBITMQ_URL, TASK_QUEUE } = require("./config");

async function startConsumer() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Assert the queue exists
    await channel.assertQueue(TASK_QUEUE, { durable: true });

    console.log(`Waiting for messages in queue '${TASK_QUEUE}'...`);

    // Consume messages from the queue
    channel.consume(
      TASK_QUEUE,
      (msg) => {
        if (msg !== null) {
          console.log(`Received message: ${msg.content.toString()}`);

          // Acknowledge the message
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
