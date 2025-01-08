import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "5L6g3nShT-eMCtK--X86sw",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "scraped-data" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
