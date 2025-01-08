import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "5L6g3nShT-eMCtK--X86sw",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

const produceMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: "scraped-data",
    messages: [{ value: "Hello" }],
  });
  await producer.disconnect();
};

produceMessage().catch(console.error);
