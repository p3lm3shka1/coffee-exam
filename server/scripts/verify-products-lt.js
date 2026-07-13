import dotenv from "dotenv";
import mongoose from "mongoose";
import Products from "../models/Products.js";

dotenv.config();

async function run() {
  console.log("MONGO_URI exists:", Boolean(process.env.MONGO_URI));

  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB:", mongoose.connection.name);
  console.log("Host:", mongoose.connection.host);

  const total = await Products.countDocuments();
  const withLtTitle = await Products.countDocuments({
    title_lt: { $exists: true, $ne: "" },
  });
  const withLtDesc = await Products.countDocuments({
    description_lt: { $exists: true, $ne: "" },
  });

  const sample = await Products.findOne(
    { title_lt: { $exists: true, $ne: "" } },
    { title: 1, title_lt: 1, description: 1, description_lt: 1 },
  );

  console.log({ total, withLtTitle, withLtDesc });
  console.log("Sample:", sample);

  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});
