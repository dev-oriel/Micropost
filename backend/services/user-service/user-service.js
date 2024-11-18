const amqp = require("amqplib");

let channel;
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

// Initialize RabbitMQ connection
async function initRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange("user_events", "topic", { durable: true });
    console.log("RabbitMQ connected and exchange asserted.");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
}

// Publish user events
function publishUserEvent(eventType, payload) {
  if (!channel) {
    console.error("RabbitMQ channel is not initialized.");
    return;
  }
  const routingKey = `user.${eventType}`;
  channel.publish(
    "user_events",
    routingKey,
    Buffer.from(JSON.stringify(payload))
  );
  console.log(`Event published: ${eventType}`, payload);
}

initRabbitMQ();

module.exports = {
  publishUserEvent,
};
