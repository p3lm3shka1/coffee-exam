import mongoose from "mongoose";
import dotenv from "dotenv";
import Products from "../models/Products.js";
import deepl from "deepl-node";

dotenv.config();

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

const isEmpty = (v) => !v || !String(v).trim();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  const products = await Products.find({});
  console.log(`Found: ${products.length} products`);

  let updated = 0;

  for (const p of products) {
    let changed = false;

    if (isEmpty(p.title_lt) && !isEmpty(p.title)) {
      const tr = await translator.translateText(p.title, "EN", "LT");
      p.title_lt = tr.text;
      changed = true;
    }

    if (isEmpty(p.description_lt) && !isEmpty(p.description)) {
      const tr = await translator.translateText(p.description, "EN", "LT");
      p.description_lt = tr.text;
      changed = true;
    }

    if (changed) {
      await p.save();
      updated += 1;
      console.log(`Updated: ${p._id}`);
    }
  }

  console.log(`Done. Updated ${updated} products.`);
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});

console.log("Mongo DB:", mongoose.connection.name);
console.log("Mongo host:", mongoose.connection.host);
