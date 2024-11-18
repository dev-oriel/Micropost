const amqp = require("amqplib");

let channel;
const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";

// Initialize RabbitMQ connection with retry mechanism
async function initRabbitMQ() {
  const retries = 5;
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to RabbitMQ... (${i + 1}/${retries})`);
      const connection = await amqp.connect(RABBITMQ_URL);
      console.log("RabbitMQ connection established.");
      channel = await connection.createChannel(); // Assign to global variable
      console.log("RabbitMQ channel created.");
      await channel.assertExchange("user_events", "topic", { durable: true });
      console.log("Exchange 'user_events' asserted.");
      return;
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ:`, error.message);
      if (i === retries - 1) {
        console.error("Exhausted retries. Exiting.");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

// Publish user events
function publishUserEvent(eventType, payload) {
  if (!channel) {
    console.error("RabbitMQ channel is not initialized. Event not published.");
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
